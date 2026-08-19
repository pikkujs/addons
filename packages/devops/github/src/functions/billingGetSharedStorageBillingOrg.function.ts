// billing — Monitor charges and usage from Actions and Packages.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BillingGetSharedStorageBillingOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const BillingGetSharedStorageBillingOrgOutput = z.object({
  days_left_in_billing_cycle: z.number().int().describe("Numbers of days left in billing cycle."),
  estimated_paid_storage_for_month: z.number().int().describe("Estimated storage space (GB) used in billing cycle."),
  estimated_storage_for_month: z.number().int().describe("Estimated sum of free and paid storage space (GB) used in billing cycle."),
})

export const billingGetSharedStorageBillingOrg = pikkuSessionlessFunc({
  description: "Gets the estimated paid and estimated total storage used for GitHub Actions and GitHub Packages.\n\nPaid minutes only apply to packages stored for private repositories. For more information, see \"[Managing billing for GitHub Packages](https://docs.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages).\"\n\nAccess tokens must have the `repo` or `admin:org` scope.",
  input: BillingGetSharedStorageBillingOrgInput,
  output: BillingGetSharedStorageBillingOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/settings/billing/shared-storage", data) as any
  },
})
