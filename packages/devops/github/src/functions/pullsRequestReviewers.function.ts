// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { ForbiddenError, UnprocessableContentError } from '@pikku/core/errors'

export const PullsRequestReviewersInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  reviewers: z.array(z.string()).optional().describe("An array of user `login`s that will be requested."),
  team_reviewers: z.array(z.string()).optional().describe("An array of team `slug`s that will be requested."),
})

export const PullsRequestReviewersOutput = z.any()

export const pullsRequestReviewers = pikkuSessionlessFunc({
  description: "This endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. See \"[Secondary rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#secondary-rate-limits)\" and \"[Dealing with secondary rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-secondary-rate-limits)\" for details.",
  input: PullsRequestReviewersInput,
  output: PullsRequestReviewersOutput,
  errors: [ForbiddenError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", data) as any
  },
})
