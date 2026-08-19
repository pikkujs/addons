// billing — Monitor charges and usage from Actions and Packages.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BillingGetGithubPackagesBillingOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
})

export const BillingGetGithubPackagesBillingOrgOutput = z.object({
  included_gigabytes_bandwidth: z.number().int().describe("Free storage space (GB) for GitHub Packages."),
  total_gigabytes_bandwidth_used: z.number().int().describe("Sum of the free and paid storage space (GB) for GitHuub Packages."),
  total_paid_gigabytes_bandwidth_used: z.number().int().describe("Total paid storage space (GB) for GitHuub Packages."),
})

export const billingGetGithubPackagesBillingOrg = pikkuSessionlessFunc({
  description: "Gets the free and paid storage used for GitHub Packages in gigabytes.\n\nPaid minutes only apply to packages stored for private repositories. For more information, see \"[Managing billing for GitHub Packages](https://docs.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages).\"\n\nAccess tokens must have the `repo` or `admin:org` scope.",
  input: BillingGetGithubPackagesBillingOrgInput,
  output: BillingGetGithubPackagesBillingOrgOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/settings/billing/packages", data) as any
  },
})
