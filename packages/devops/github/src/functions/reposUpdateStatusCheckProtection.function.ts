// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposUpdateStatusCheckProtectionInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  branch: z.string().describe("The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql)."),
  checks: z.array(z.object({
  app_id: z.number().int().optional().describe("The ID of the GitHub App that must provide this check. Omit this field to automatically select the GitHub App that has recently provided this check, or any app if it was not set by a GitHub App. Pass -1 to explicitly allow any app to set the status."),
  context: z.string().describe("The name of the required check"),
})).optional().describe("The list of status checks to require in order to merge into this branch."),
  contexts: z.array(z.string()).optional().describe("**Deprecated**: The list of status checks to require in order to merge into this branch. If any of these checks have recently been set by a particular GitHub App, they will be required to come from that app in future for the branch to merge. Use `checks` instead of `contexts` for more fine-grained control.\n"),
  strict: z.boolean().optional().describe("Require branches to be up to date before merging."),
})

export const ReposUpdateStatusCheckProtectionOutput = z.object({
  checks: z.array(z.object({
    app_id: z.number().int().nullable(),
    context: z.string(),
  })),
  contexts: z.array(z.string()),
  contexts_url: z.string().url(),
  strict: z.boolean(),
  url: z.string().url(),
}).describe("Status Check Policy")

export const reposUpdateStatusCheckProtection = pikkuSessionlessFunc({
  description: "Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.\n\nUpdating required status checks requires admin or owner permissions to the repository and branch protection to be enabled.",
  input: ReposUpdateStatusCheckProtectionInput,
  output: ReposUpdateStatusCheckProtectionOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks", data) as any
  },
})
