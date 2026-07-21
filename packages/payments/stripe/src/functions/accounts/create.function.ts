import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ConnectedAccountSchema, MetadataSchema } from '../../stripe.types.js'

export const AccountCreateInput = z.object({
  type: z.enum(['standard', 'express', 'custom']).optional().describe('The Connect account type. express is the usual choice for marketplaces — Stripe hosts onboarding and the dashboard. Defaults to express'),
  country: z.string().optional().describe('The country the account holder resides in, as a 2-letter ISO code'),
  email: z.string().optional().describe('The email address of the account holder'),
  business_type: z.enum(['individual', 'company', 'non_profit', 'government_entity']).optional().describe('The type of business the account represents'),
  capabilities: z
    .object({
      card_payments: z.boolean().optional().describe('Request the card_payments capability'),
      transfers: z.boolean().optional().describe('Request the transfers capability (needed to receive payouts from your platform)'),
    })
    .optional()
    .describe('The capabilities to request for this account. For most marketplaces request card_payments and transfers'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the account'),
})

export const AccountCreateOutput = ConnectedAccountSchema

type Output = z.infer<typeof AccountCreateOutput>

export const accountCreate = pikkuSessionlessFunc({
  description: 'Create a Stripe Connect account for a marketplace seller/vendor. Follow up with an account link to onboard them',
  node: { displayName: 'Create Connect Account', category: 'Connect', type: 'action' },
  input: AccountCreateInput,
  output: AccountCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.accounts.create({
      type: data.type ?? 'express',
      ...(data.country ? { country: data.country } : {}),
      ...(data.email ? { email: data.email } : {}),
      ...(data.business_type ? { business_type: data.business_type } : {}),
      ...(data.capabilities
        ? {
            capabilities: {
              ...(data.capabilities.card_payments !== undefined
                ? { card_payments: { requested: data.capabilities.card_payments } }
                : {}),
              ...(data.capabilities.transfers !== undefined
                ? { transfers: { requested: data.capabilities.transfers } }
                : {}),
            },
          }
        : {}),
      ...(data.metadata ? { metadata: data.metadata } : {}),
    }) as unknown as Output
  },
})
