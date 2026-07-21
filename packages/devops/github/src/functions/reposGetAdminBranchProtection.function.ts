// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReposGetAdminBranchProtectionInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  branch: z.string().describe("The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql)."),
})

export const ReposGetAdminBranchProtectionOutput = z.object({
  enabled: z.boolean(),
  url: z.string().url(),
}).describe("Protected Branch Admin Enforced")

export const reposGetAdminBranchProtection = pikkuSessionlessFunc({
  description: "Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.",
  input: ReposGetAdminBranchProtectionInput,
  output: ReposGetAdminBranchProtectionOutput,
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins", data) as any
  },
})
