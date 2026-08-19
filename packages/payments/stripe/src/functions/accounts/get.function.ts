import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ConnectedAccountSchema } from '../../stripe.types.js'
import { epochToIso } from '../../stripe.transform.js'

export const AccountGetInput = z.object({
  accountId: z.string().describe('The identifier of the connected account to retrieve (acct_...)'),
})

export const AccountGetOutput = ConnectedAccountSchema

export const accountGet = pikkuSessionlessFunc({
  description: 'Retrieve a Connect account to check onboarding status (chargesEnabled, payoutsEnabled, detailsSubmitted)',
  node: { displayName: 'Get Connect Account', category: 'Connect', type: 'action' },
  input: AccountGetInput,
  output: AccountGetOutput,
  func: async ({ stripe }, { accountId }) => {
    const result = await stripe.accounts.retrieve(accountId)
    return AccountGetOutput.parse({
      id: result.id,
      object: result.object,
      type: result.type,
      email: result.email,
      country: result.country,
      chargesEnabled: result.charges_enabled,
      payoutsEnabled: result.payouts_enabled,
      detailsSubmitted: result.details_submitted,
      created: epochToIso(result.created),
      metadata: result.metadata,
    })
  },
})
