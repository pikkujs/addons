// billing — Monitor charges and usage from Actions and Packages.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BillingGetGithubPackagesBillingUserInput = z.object({
  username: z.string().describe("The handle for the GitHub user account."),
})

export const BillingGetGithubPackagesBillingUserOutput = z.object({
  included_gigabytes_bandwidth: z.number().int().describe("Free storage space (GB) for GitHub Packages."),
  total_gigabytes_bandwidth_used: z.number().int().describe("Sum of the free and paid storage space (GB) for GitHuub Packages."),
  total_paid_gigabytes_bandwidth_used: z.number().int().describe("Total paid storage space (GB) for GitHuub Packages."),
})

export const billingGetGithubPackagesBillingUser = pikkuSessionlessFunc({
  description: "Gets the free and paid storage used for GitHub Packages in gigabytes.\n\nPaid minutes only apply to packages stored for private repositories. For more information, see \"[Managing billing for GitHub Packages](https://docs.github.com/github/setting-up-and-managing-billing-and-payments-on-github/managing-billing-for-github-packages).\"\n\nAccess tokens must have the `user` scope.",
  input: BillingGetGithubPackagesBillingUserInput,
  output: BillingGetGithubPackagesBillingUserOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/users/{username}/settings/billing/packages", data) as any
  },
})
