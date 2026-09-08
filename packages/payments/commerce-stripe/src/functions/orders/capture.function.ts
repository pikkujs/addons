import { z } from 'zod'
import { pikkuFunc } from '#pikku/addon/function'
import { BadRequestError, NotFoundError } from '@pikku/core/errors'
import { applyPaidTransition } from '../../lib/settle-order.js'

export const CaptureOrderInput = z.object({
  id: z.string().describe('An authorised order to charge'),
  amountMinor: z
    .number()
    .int()
    .positive()
    .optional()
    .describe(
      "Capture less than was authorised, in the currency's minor unit — for a part-shipped order. The remainder is released back to the customer. Omit to capture the full amount"
    ),
})

export const CaptureOrderOutput = z.object({
  id: z.string(),
  status: z.string(),
  amountCapturedMinor: z.number().describe('What was actually taken'),
})

/**
 * Charges an order that was authorised at checkout with `captureMethod: 'manual'`.
 *
 * This is the point stock moves and the order enters the shipping queue, so the
 * shape of the flow is: authorise when the customer buys, capture when you know
 * you can ship. Capturing less than authorised releases the difference — Stripe
 * gives no second capture, so a part-shipment is one reduced capture, not two.
 *
 * A card authorisation expires after about seven days; past that Stripe rejects
 * the capture and the customer has to buy again.
 */
export const captureOrder = pikkuFunc({
  description: 'Capture a manually-authorised order, in full or for less than was authorised',
  node: { displayName: 'Capture Order', category: 'Orders', type: 'action' },
  input: CaptureOrderInput,
  output: CaptureOrderOutput,
  tags: ['addon'],
  func: async ({ stripeApi, kysely }, data) => {
    const order = await kysely
      .selectFrom('paymentOrder')
      .select([
        'id',
        'cartId',
        'status',
        'captureMethod',
        'amountMinor',
        'stripePaymentIntentId',
      ])
      .where('id', '=', data.id)
      .executeTakeFirst()
    if (!order) {
      throw new NotFoundError(`Unknown order ${data.id}`)
    }
    if (order.captureMethod !== 'manual') {
      throw new BadRequestError(`Order ${data.id} was captured automatically at checkout`)
    }
    if (order.status !== 'authorized') {
      throw new BadRequestError(`Order ${data.id} is ${order.status}, not authorized`)
    }

    const amountMinor = data.amountMinor ?? order.amountMinor
    if (amountMinor > order.amountMinor) {
      throw new BadRequestError(
        `Cannot capture ${amountMinor} — only ${order.amountMinor} was authorised`
      )
    }

    if (!order.stripePaymentIntentId) {
      throw new BadRequestError(`Order ${data.id} has no payment intent to capture`)
    }

    await stripeApi.post(
      `/payment_intents/${order.stripePaymentIntentId}/capture`,
      { amount_to_capture: amountMinor },
      `capture_${data.id}`
    )

    const now = new Date().toISOString()
    await kysely
      .updateTable('paymentOrder')
      .set({ status: 'paid', amountCapturedMinor: amountMinor, updatedAt: now })
      .where('id', '=', data.id)
      .execute()

    await applyPaidTransition(kysely, order, now)

    return { id: data.id, status: 'paid', amountCapturedMinor: amountMinor }
  },
})
