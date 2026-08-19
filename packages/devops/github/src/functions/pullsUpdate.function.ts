// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const PullsUpdateInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  base: z.string().optional().describe("The name of the branch you want your changes pulled into. This should be an existing branch on the current repository. You cannot update the base branch on a pull request to point to another repository."),
  body: z.string().optional().describe("The contents of the pull request."),
  maintainer_can_modify: z.boolean().optional().describe("Indicates whether [maintainers can modify](https://docs.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork/) the pull request."),
  state: z.enum(["open", "closed"]).optional().describe("State of this Pull Request. Either `open` or `closed`."),
  title: z.string().optional().describe("The title of the pull request."),
})

export const PullsUpdateOutput = z.any()

export const pullsUpdate = pikkuSessionlessFunc({
  description: "Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.\n\nTo open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request.",
  input: PullsUpdateInput,
  output: PullsUpdateOutput,
  errors: [ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/pulls/{pull_number}", data) as any
  },
})
