import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AccountLinkCreateInput = z.object({
  account: z.string().describe('The connected account to onboard (acct_...)'),
  refresh_url: z.string().describe('URL the user is sent to if the link expires or is revisited after use — recreate a fresh link and redirect again'),
  return_url: z.string().describe('URL the user is sent to once they complete (or exit) the onboarding flow'),
  type: z.enum(['account_onboarding', 'account_update']).optional().describe('account_onboarding to collect required info the first time, account_update to let an existing account update its details. Defaults to account_onboarding'),
})

export const AccountLinkCreateOutput = z.object({
  object: z.literal('account_link').describe('String representing the object\'s type'),
  created: z.number().describe('Time at which the object was created. Measured in seconds since the Unix epoch'),
  expires_at: z.number().describe('The timestamp at which this link will expire. Measured in seconds since the Unix epoch'),
  url: z.string().describe('The single-use Stripe-hosted URL to redirect the user to for onboarding'),
})

type Output = z.infer<typeof AccountLinkCreateOutput>

export const accountLinkCreate = pikkuSessionlessFunc({
  description: 'Create a single-use, Stripe-hosted onboarding link for a Connect account. Redirect the seller to the returned URL',
  node: { displayName: 'Create Account Link', category: 'Connect', type: 'action' },
  input: AccountLinkCreateInput,
  output: AccountLinkCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.accountLinks.create({
      account: data.account,
      refresh_url: data.refresh_url,
      return_url: data.return_url,
      type: data.type ?? 'account_onboarding',
    }) as unknown as Output
  },
})
