import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema, PayoutSchema } from '../../stripe.types.js'

export const PayoutCreateInput = z.object({
  amount: z.number().describe('Amount, in the smallest currency unit, to pay out to the bank account or debit card'),
  currency: z.string().describe('Three-letter ISO currency code, lowercase'),
  method: z.enum(['standard', 'instant']).optional().describe('standard (free, arrives in a few business days) or instant (fee, arrives in minutes if supported). Defaults to standard'),
  description: z.string().optional().describe('An arbitrary string attached to the payout'),
  stripe_account: z.string().optional().describe('When paying out a connected account\'s balance, its account id (acct_...). Omit to pay out your own platform balance'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to the payout'),
})

export const PayoutCreateOutput = PayoutSchema

type Output = z.infer<typeof PayoutCreateOutput>

export const payoutCreate = pikkuSessionlessFunc({
  description: 'Send funds from a Stripe balance to the bank account or debit card on file. Pass stripe_account to pay out a connected account\'s balance',
  node: { displayName: 'Create Payout', category: 'Connect', type: 'action' },
  input: PayoutCreateInput,
  output: PayoutCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.payouts.create(
      {
        amount: data.amount,
        currency: data.currency,
        ...(data.method ? { method: data.method } : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.metadata ? { metadata: data.metadata } : {}),
      },
      data.stripe_account ? { stripeAccount: data.stripe_account } : undefined,
    ) as unknown as Output
  },
})
