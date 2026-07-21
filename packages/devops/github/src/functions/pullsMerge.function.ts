// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError, MethodNotAllowedError, ConflictError, UnprocessableContentError } from '@pikku/core/errors'

export const PullsMergeInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  pull_number: z.number().int().describe("The number that identifies the pull request."),
  commit_message: z.string().optional().describe("Extra detail to append to automatic commit message."),
  commit_title: z.string().optional().describe("Title for the automatic commit message."),
  merge_method: z.enum(["merge", "squash", "rebase"]).optional().describe("The merge method to use."),
  sha: z.string().optional().describe("SHA that pull request head must match to allow merge."),
})

export const PullsMergeOutput = z.object({
  merged: z.boolean(),
  message: z.string(),
  sha: z.string(),
}).describe("Pull Request Merge Result")

export const pullsMerge = pikkuSessionlessFunc({
  description: "This endpoint triggers [notifications](https://docs.github.com/github/managing-subscriptions-and-notifications-on-github/about-notifications). Creating content too quickly using this endpoint may result in secondary rate limiting. See \"[Secondary rate limits](https://docs.github.com/rest/overview/resources-in-the-rest-api#secondary-rate-limits)\" and \"[Dealing with secondary rate limits](https://docs.github.com/rest/guides/best-practices-for-integrators#dealing-with-secondary-rate-limits)\" for details.",
  input: PullsMergeInput,
  output: PullsMergeOutput,
  errors: [ForbiddenError, NotFoundError, MethodNotAllowedError, ConflictError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/pulls/{pull_number}/merge", data) as any
  },
})
