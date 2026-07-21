import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ConnectedAccountSchema } from '../../stripe.types.js'

export const AccountGetInput = z.object({
  accountId: z.string().describe('The identifier of the connected account to retrieve (acct_...)'),
})

export const AccountGetOutput = ConnectedAccountSchema

type Output = z.infer<typeof AccountGetOutput>

export const accountGet = pikkuSessionlessFunc({
  description: 'Retrieve a Connect account to check onboarding status (charges_enabled, payouts_enabled, details_submitted)',
  node: { displayName: 'Get Connect Account', category: 'Connect', type: 'action' },
  input: AccountGetInput,
  output: AccountGetOutput,
  func: async ({ stripe }, { accountId }) => {
    return await stripe.accounts.retrieve(accountId) as unknown as Output
  },
})
