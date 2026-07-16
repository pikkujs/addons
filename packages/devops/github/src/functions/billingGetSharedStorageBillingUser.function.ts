// billing — Monitor charges and usage from Actions and Packages.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BillingGetSharedStorageBillingUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
})

export const BillingGetSharedStorageBillingUserOutput = z.object({
  days_left_in_billing_cycle: z.number().int().describe("Numbers of days left in billing cycle."),
  estimated_paid_storage_for_month: z.number().int().describe("Estimated storage space (GB) used in billing cycle."),
  estimated_storage_for_month: z.number().int().describe("Estimated sum of free and paid storage space (GB) used in billing cycle."),
})

export const billingGetSharedStorageBillingUser = pikkuSessionlessFunc({
  description: "Gets the estimated paid and estimated total storage used for GitHub Actions and GitHub Packages.\n\nPaid minutes only apply to packages stored for private repositories. For more information, see \"[Managing billing for GitHub Packages](https://docs.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages).\"\n\nAccess tokens must have the `user` scope.",
  input: BillingGetSharedStorageBillingUserInput,
  output: BillingGetSharedStorageBillingUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/settings/billing/shared-storage", data) as any
  },
})
