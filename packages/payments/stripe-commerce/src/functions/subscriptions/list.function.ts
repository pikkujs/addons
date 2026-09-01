import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListSubscriptionsInput = z.object({
  status: z.string().optional().describe('Only return subscriptions in this Stripe status'),
  storefront: z
    .boolean()
    .optional()
    .describe(
      'True returns only subscriptions selling a variant from this catalogue, false only those from elsewhere — a plan subscription an auth layer owns. Omit for both'
    ),
  limit: z.number().int().positive().max(100).optional().describe('Maximum rows to return. Defaults to 50'),
})

export const ListSubscriptionsOutput = z.array(
  z.object({
    id: z.string(),
    stripeSubscriptionId: z.string(),
    stripePriceId: z.string().nullable(),
    variantId: z
      .string()
      .nullable()
      .describe('The catalogue variant this sells, or null when the subscription came from elsewhere'),
    status: z.string(),
    currentPeriodEnd: z.string().nullable(),
    cancelAtPeriodEnd: z.boolean(),
  })
)

export const listSubscriptions = pikkuSessionlessFunc({
  description: 'List recorded subscriptions',
  node: { displayName: 'List Subscriptions', category: 'Subscriptions', type: 'action' },
  input: ListSubscriptionsInput,
  output: ListSubscriptionsOutput,
  tags: ['addon'],
  func: async ({ kysely, paymentOwner }, data, { session }) => {
    // Every `customer.subscription.*` on the account lands in this table,
    // including ones another part of the app owns, so a signed-in caller has to
    // be scoped to their own rows before any of it is handed back.
    const owner = session ? await paymentOwner.resolve(session) : null

    let query = kysely
      .selectFrom('paymentSubscription')
      .select([
        'id',
        'stripeSubscriptionId',
        'stripePriceId',
        'variantId',
        'status',
        'currentPeriodEnd',
        'cancelAtPeriodEnd',
      ])
      .orderBy('createdAt', 'desc')
      .limit(data.limit ?? 50)

    if (owner) {
      query = query.where('customerId', 'in', (eb) =>
        eb
          .selectFrom('paymentCustomer')
          .select('id')
          .where('ownerType', '=', owner.type)
          .where('ownerId', '=', owner.id)
      )
    }
    if (data.status) {
      query = query.where('status', '=', data.status)
    }
    if (data.storefront !== undefined) {
      query = query.where('variantId', data.storefront ? 'is not' : 'is', null)
    }

    const rows = await query.execute()
    return rows.map((row) => ({ ...row, cancelAtPeriodEnd: row.cancelAtPeriodEnd === 1 }))
  },
})
