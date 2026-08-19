// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const PullsCreateInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  base: z.string().describe("The name of the branch you want the changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository."),
  body: z.string().optional().describe("The contents of the pull request."),
  draft: z.boolean().optional().describe("Indicates whether the pull request is a draft. See \"[Draft Pull Requests](https://docs.github.com/articles/about-pull-requests#draft-pull-requests)\" in the GitHub Help documentation to learn more."),
  head: z.string().describe("The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace `head` with a user like this: `username:branch`."),
  head_repo: z.string().optional().describe("The name of the repository where the changes in the pull request were made. This field is required for cross-repository pull requests if both repositories are owned by the same organization."),
  issue: z.number().int().optional().describe("An issue in the repository to convert to a pull request. The issue title, body, and comments will become the title, body, and comments on the new pull request. Required unless `title` is specified."),
  maintainer_can_modify: z.boolean().optional().describe("Indicates whether [maintainers can modify](https://docs.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork/) the pull request."),
  title: z.string().optional().describe("The title of the new pull request. Required unless `issue` is specified."),
})

export const PullsCreateOutput = z.any()

export const pullsCreate = pikkuSessionlessFunc({
  description: "Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see [GitHub's products](https://docs.github.com/github/getting-started-with-github/githubs-products) in the GitHub Help documentation.\n\nTo open or update a pull request in a public repository, you must have write access to the head or the source branch. For organization-owned repositories, you must be a member of the organization that owns the repository to open or update a pull request.\n\nThis endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. See \"[Secondary rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#secondary-rate-limits)\" and \"[Dealing with secondary rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-rate-limits)\" for details.",
  input: PullsCreateInput,
  output: PullsCreateOutput,
  errors: [ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/pulls", data) as any
  },
})
