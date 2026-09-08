import { z } from 'zod'
import { pikkuFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import { pushShippingRate } from '../../lib/stripe-catalog.js'

export const SaveShippingRateInput = z.object({
  id: z.string().optional().describe('Omit to create a rate, provide to replace one'),
  name: z.string().describe('Shown to the customer at checkout, e.g. "Standard" or "Next day"'),
  amountMinor: z.number().int().nonnegative().describe("Cost in the currency's minor unit. Zero for free shipping"),
  currency: z.string().describe('Three-letter ISO currency code, lowercase'),
  deliveryMinDays: z.number().int().nonnegative().nullish().describe('Fastest business days, shown as an estimate'),
  deliveryMaxDays: z.number().int().nonnegative().nullish().describe('Slowest business days, shown as an estimate'),
  position: z.number().int().optional().describe('Sort order at checkout'),
  active: z.boolean().optional().describe('Defaults to true'),
})

export const SaveShippingRateOutput = z.object({
  id: z.string(),
  stripeShippingRateId: z.string().nullable().describe('The mirrored Stripe rate, null if the push failed'),
})

/**
 * A Stripe shipping rate is immutable like a Price, so an edit creates a
 * replacement and the local row points at the new one. The old Stripe rate is
 * left alone: sessions already created reference it, and Stripe has no delete.
 */
export const saveShippingRate = pikkuFunc({
  description: 'Create or replace a shipping rate offered at checkout, writing through to Stripe',
  node: { displayName: 'Save Shipping Rate', category: 'Shipping', type: 'action' },
  input: SaveShippingRateInput,
  output: SaveShippingRateOutput,
  tags: ['addon'],
  func: async ({ stripeApi, kysely, logger }, data) => {
    const now = new Date().toISOString()
    const id = data.id ?? crypto.randomUUID()

    if (data.id) {
      const existing = await kysely
        .selectFrom('paymentShippingRate')
        .select(['id'])
        .where('id', '=', data.id)
        .executeTakeFirst()
      if (!existing) {
        throw new BadRequestError(`Unknown shipping rate ${data.id}`)
      }
    }

    const fields = {
      name: data.name,
      amountMinor: data.amountMinor,
      currency: data.currency,
      deliveryMinDays: data.deliveryMinDays ?? null,
      deliveryMaxDays: data.deliveryMaxDays ?? null,
      position: data.position ?? 0,
      active: (data.active ?? true) ? 1 : 0,
      updatedAt: now,
    }

    let stripeShippingRateId: string | null = null
    try {
      stripeShippingRateId = await pushShippingRate(stripeApi, fields)
    } catch (error) {
      logger.warn(
        `shipping rate ${id} saved but the Stripe push failed (${(error as Error).message}) — checkout will retry it`
      )
    }

    if (data.id) {
      await kysely
        .updateTable('paymentShippingRate')
        .set({ ...fields, stripeShippingRateId })
        .where('id', '=', id)
        .execute()
    } else {
      await kysely
        .insertInto('paymentShippingRate')
        .values({ id, stripeShippingRateId, createdAt: now, ...fields })
        .execute()
    }

    return { id, stripeShippingRateId }
  },
})
