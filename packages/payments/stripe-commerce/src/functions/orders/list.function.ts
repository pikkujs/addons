import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListOrdersInput = z.object({
  status: z
    .enum(['pending', 'authorized', 'processing', 'paid', 'failed', 'expired', 'refunded'])
    .optional()
    .describe(
      "Only return orders in this state. 'authorized' is money held awaiting captureOrder; 'processing' is a delayed payment method whose funds have not settled. Neither may be fulfilled"
    ),
  disputed: z.boolean().optional().describe('Only return orders with an open or closed dispute'),
  fulfillmentStatus: z
    .enum(['not_required', 'unfulfilled', 'fulfilled'])
    .optional()
    .describe('Only return orders in this fulfilment state. Use "unfulfilled" for the shipping queue'),
  email: z.string().optional().describe('Only return orders for this customer email'),
  ownerId: z
    .string()
    .optional()
    .describe(
      'Only return orders belonging to this owner — the id your paymentOwner service resolves, so a user or an organization id. Ignored for a signed-in caller, who only ever sees their own'
    ),
  ownerType: z
    .string()
    .optional()
    .describe("The owner's type, paired with ownerId. Defaults to 'user'"),
  limit: z.number().int().positive().max(100).optional().describe('Maximum rows to return. Defaults to 50'),
  offset: z.number().int().nonnegative().optional().describe('Defaults to 0'),
})

export const ListOrdersOutput = z.array(
  z.object({
    id: z.string(),
    email: z.string().nullable(),
    amountMinor: z.number().describe("Amount in the currency's minor unit"),
    amountRefundedMinor: z.number(),
    currency: z.string(),
    status: z.string(),
    fulfillmentStatus: z.string(),
    disputeStatus: z.string().nullable(),
    stripeCheckoutSessionId: z.string().nullable(),
    createdAt: z.string(),
  })
)

export const listOrders = pikkuSessionlessFunc({
  description: 'List recorded payment orders, most recent first',
  node: { displayName: 'List Orders', category: 'Orders', type: 'action' },
  input: ListOrdersInput,
  output: ListOrdersOutput,
  tags: ['addon'],
  func: async ({ kysely, paymentOwner }, data, { session }) => {
    // A signed-in caller is scoped to themselves. The input filter is for a
    // back office wired without a session, which the app guards on the route.
    const owner = session ? await paymentOwner.resolve(session) : null
    const ownerType = owner ? owner.type : (data.ownerType ?? 'user')
    const ownerId = owner ? owner.id : data.ownerId

    let query = kysely
      .selectFrom('paymentOrder')
      .select([
        'id',
        'email',
        'amountMinor',
        'amountRefundedMinor',
        'currency',
        'status',
        'fulfillmentStatus',
        'disputeStatus',
        'stripeCheckoutSessionId',
        'createdAt',
      ])
      .orderBy('createdAt', 'desc')
      .limit(data.limit ?? 50)
      .offset(data.offset ?? 0)

    if (data.status) {
      query = query.where('status', '=', data.status)
    }
    if (data.fulfillmentStatus) {
      query = query.where('fulfillmentStatus', '=', data.fulfillmentStatus)
    }
    if (data.email) {
      query = query.where('email', '=', data.email)
    }
    if (ownerId) {
      query = query.where('customerId', 'in', (eb) =>
        eb
          .selectFrom('paymentCustomer')
          .select('id')
          .where('ownerType', '=', ownerType)
          .where('ownerId', '=', ownerId)
      )
    }
    if (data.disputed) {
      query = query.where('disputeStatus', 'is not', null)
    }

    return await query.execute()
  },
})
