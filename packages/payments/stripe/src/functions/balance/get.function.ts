import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BalanceGetInput = z.object({})

export const SourceTypesSchema = z.object({
  bank_account: z.number().optional().describe('Amount coming from legacy US ACH payments'),
  card: z.number().optional().describe('Amount coming from most payment methods, including cards as well as non-legacy bank debits'),
  fpx: z.number().optional().describe('Amount coming from FPX, a Malaysian payment method'),
})

export const BalanceAmountSchema = z.object({
  amount: z.number().describe('Balance amount'),
  currency: z.string().describe('Three-letter ISO currency code, in lowercase. Must be a supported currency'),
  source_types: SourceTypesSchema.optional().describe('Breakdown of balance by source type'),
})

export const BalanceGetOutput = z.object({
  object: z.literal('balance').describe('String representing the object\'s type'),
  available: z.array(BalanceAmountSchema).describe('Available funds that you can transfer or pay out automatically by Stripe or explicitly through the Transfers API or Payouts API'),
  pending: z.array(BalanceAmountSchema).describe('Funds that aren\'t available in the balance yet'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode or the value false if the object exists in test mode'),
})

type Output = z.infer<typeof BalanceGetOutput>

export const balanceGet = pikkuSessionlessFunc({
  description: 'Retrieve the current balance on your Stripe account',
  node: { displayName: 'Get Balance', category: 'Balance', type: 'action' },
  input: BalanceGetInput,
  output: BalanceGetOutput,
  func: async ({ stripe }) => {
    return await stripe.balance.retrieve() as Output
  },
})
