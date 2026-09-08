import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListShippingRatesInput = z.object({
  includeInactive: z.boolean().optional().describe('Include retired rates. Defaults to false'),
})

export const ListShippingRatesOutput = z.object({
  rates: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      amountMinor: z.number(),
      currency: z.string(),
      deliveryMinDays: z.number().nullable(),
      deliveryMaxDays: z.number().nullable(),
      active: z.boolean(),
    })
  ),
})

export const listShippingRates = pikkuSessionlessFunc({
  description: 'List the shipping rates offered at checkout',
  node: { displayName: 'List Shipping Rates', category: 'Shipping', type: 'action' },
  input: ListShippingRatesInput,
  output: ListShippingRatesOutput,
  tags: ['addon'],
  func: async ({ kysely }, data) => {
    let query = kysely.selectFrom('paymentShippingRate').selectAll().orderBy('position', 'asc')
    if (!data.includeInactive) {
      query = query.where('active', '=', 1)
    }
    const rates = await query.execute()
    return {
      rates: rates.map((rate) => ({
        id: rate.id,
        name: rate.name,
        amountMinor: rate.amountMinor,
        currency: rate.currency,
        deliveryMinDays: rate.deliveryMinDays,
        deliveryMaxDays: rate.deliveryMaxDays,
        active: rate.active === 1,
      })),
    }
  },
})
