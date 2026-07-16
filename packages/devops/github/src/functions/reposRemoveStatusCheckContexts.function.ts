// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposRemoveStatusCheckContextsInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  branch: z.string().describe("The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use [the GraphQL API](https://docs.github.com/graphql)."),
  body: z.union([z.object({
  contexts: z.array(z.string()).describe("The name of the status checks"),
}), z.array(z.string())]),
})

export const ReposRemoveStatusCheckContextsOutput = z.array(z.string())

export const reposRemoveStatusCheckContexts = pikkuSessionlessFunc({
  description: "Protected branches are available in public repositories with GitHub Free and GitHub Free for organizations, and in public and private repositories with GitHub Pro, GitHub Team, GitHub Enterprise Cloud, and GitHub Enterprise Server. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.",
  input: ReposRemoveStatusCheckContextsInput,
  output: ReposRemoveStatusCheckContextsOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", data) as any
  },
})
