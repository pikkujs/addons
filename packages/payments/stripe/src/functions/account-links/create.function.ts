import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { epochToIso } from '../../stripe.transform.js'

export const AccountLinkCreateInput = z.object({
  account: z.string().describe('The connected account to onboard (acct_...)'),
  refreshUrl: z.string().describe('URL the user is sent to if the link expires or is revisited after use — recreate a fresh link and redirect again'),
  returnUrl: z.string().describe('URL the user is sent to once they complete (or exit) the onboarding flow'),
  type: z.enum(['account_onboarding', 'account_update']).optional().describe('account_onboarding to collect required info the first time, account_update to let an existing account update its details. Defaults to account_onboarding'),
})

export const AccountLinkCreateOutput = z.object({
  object: z.literal('account_link').describe('String representing the object\'s type'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  expiresAt: z.string().datetime().describe('The time at which this link will expire, as an ISO-8601 string'),
  url: z.string().describe('The single-use Stripe-hosted URL to redirect the user to for onboarding'),
})

export const accountLinkCreate = pikkuSessionlessFunc({
  description: 'Create a single-use, Stripe-hosted onboarding link for a Connect account. Redirect the seller to the returned URL',
  node: { displayName: 'Create Account Link', category: 'Connect', type: 'action' },
  input: AccountLinkCreateInput,
  output: AccountLinkCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.accountLinks.create({
      account: data.account,
      refresh_url: data.refreshUrl,
      return_url: data.returnUrl,
      type: data.type ?? 'account_onboarding',
    })
    return AccountLinkCreateOutput.parse({
      object: result.object,
      created: epochToIso(result.created),
      expiresAt: epochToIso(result.expires_at),
      url: result.url,
    })
  },
})
