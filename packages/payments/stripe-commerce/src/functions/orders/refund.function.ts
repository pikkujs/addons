import { z } from 'zod'
import { pikkuFunc } from '#pikku/addon/function'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'

export const RefundOrderInput = z.object({
  id: z.string().describe('The order to refund'),
  amountMinor: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Partial refund amount in the currency's minor unit. Omit to refund the full remaining amount"),
  reason: z
    .enum(['duplicate', 'fraudulent', 'requested_by_customer'])
    .optional()
    .describe('Passed to Stripe, which uses it in its dispute and fraud signals'),
  restock: z
    .boolean()
    .optional()
    .describe('Return the order quantities to stock for variants that track it. Defaults to true on a full refund'),
})

export const RefundOrderOutput = z.object({
  id: z.string(),
  refundId: z.string().describe('The Stripe refund id'),
  amountRefundedMinor: z.number().describe('Total refunded against this order so far'),
  status: z.string().describe("The order status — 'refunded' once fully refunded"),
})

/**
 * Issues the refund through Stripe and applies the result locally rather than
 * waiting for `charge.refunded`. The webhook still fires and is still idempotent
 * — it sets the same terminal state — but an operator who clicks refund should
 * see it applied, not eventually applied.
 */
export const refundOrder = pikkuFunc({
  description: 'Refund an order in full or in part through Stripe, optionally restocking the items',
  node: { displayName: 'Refund Order', category: 'Orders', type: 'action' },
  input: RefundOrderInput,
  output: RefundOrderOutput,
  tags: ['addon'],
  func: async ({ stripeApi, kysely }, data) => {
    const order = await kysely
      .selectFrom('paymentOrder')
      .selectAll()
      .where('id', '=', data.id)
      .executeTakeFirst()
    if (!order) {
      throw new NotFoundError(`Unknown order ${data.id}`)
    }
    if (!order.stripePaymentIntentId) {
      throw new BadRequestError(`Order ${data.id} has no payment to refund`)
    }

    const remaining = order.amountMinor - order.amountRefundedMinor
    if (remaining <= 0) {
      throw new BadRequestError(`Order ${data.id} is already fully refunded`)
    }
    const amountMinor = data.amountMinor ?? remaining
    if (amountMinor > remaining) {
      throw new BadRequestError(
        `Cannot refund ${amountMinor} — only ${remaining} remains on order ${data.id}`
      )
    }

    const refund = await stripeApi.post<{ id: string }>(
      '/refunds',
      {
        payment_intent: order.stripePaymentIntentId,
        amount: amountMinor,
        ...(data.reason ? { reason: data.reason } : {}),
      },
      `refund_${data.id}_${order.amountRefundedMinor}_${amountMinor}`
    )

    const now = new Date().toISOString()

    // Stripe replays a refund for a repeated idempotency key, and two operators
    // refunding at once each read the same running total. Keying the ledger on
    // Stripe's refund id makes the insert the thing that decides whether this
    // refund is new, and the total then moves by a delta the database applies
    // rather than by a figure read before the call.
    const applied = await kysely
      .insertInto('paymentRefund')
      .values({
        id: refund.id,
        orderId: data.id,
        amountMinor,
        reason: data.reason ?? null,
        createdAt: now,
      })
      .onConflict((oc) => oc.column('id').doNothing())
      .executeTakeFirst()

    if (applied.numInsertedOrUpdatedRows) {
      await kysely
        .updateTable('paymentOrder')
        .set((eb) => ({
          amountRefundedMinor: eb('amountRefundedMinor', '+', amountMinor),
          updatedAt: now,
        }))
        .where('id', '=', data.id)
        .where('amountRefundedMinor', '<=', order.amountMinor - amountMinor)
        .execute()
    }

    const settled = await kysely
      .selectFrom('paymentOrder')
      .select(['amountRefundedMinor', 'status'])
      .where('id', '=', data.id)
      .executeTakeFirstOrThrow()

    const amountRefundedMinor = settled.amountRefundedMinor
    const fullyRefunded = amountRefundedMinor >= order.amountMinor

    if (fullyRefunded && settled.status !== 'refunded') {
      await kysely
        .updateTable('paymentOrder')
        .set({ status: 'refunded', updatedAt: now })
        .where('id', '=', data.id)
        .execute()
    }

    if (data.restock ?? fullyRefunded) {
      const items = await kysely
        .selectFrom('paymentOrderItem')
        .select(['variantId', 'quantity'])
        .where('orderId', '=', data.id)
        .execute()
      for (const item of items) {
        if (item.variantId) {
          await kysely
            .updateTable('paymentVariant')
            .set((eb) => ({ stock: eb('stock', '+', item.quantity), updatedAt: now }))
            .where('id', '=', item.variantId)
            .where('stock', 'is not', null)
            .execute()
        }
      }
    }

    return {
      id: data.id,
      refundId: refund.id,
      amountRefundedMinor,
      status: fullyRefunded ? 'refunded' : settled.status,
    }
  },
})
