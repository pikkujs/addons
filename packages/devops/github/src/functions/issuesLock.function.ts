// issues — Interact with GitHub Issues.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const IssuesLockInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  issue_number: z.number().int().describe("The number that identifies the issue."),
  lock_reason: z.enum(["off-topic", "too heated", "resolved", "spam"]).optional().describe("The reason for locking the issue or pull request conversation. Lock will fail if you don't use one of these reasons:  \n * `off-topic`  \n * `too heated`  \n * `resolved`  \n * `spam`"),
})

export const issuesLock = pikkuSessionlessFunc({
  description: "Users with push access can lock an issue or pull request's conversation.\n\nNote that, if you choose not to pass any parameters, you'll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see \"[HTTP verbs](https://docs.github.com/rest/overview/resources-in-the-rest-api#http-verbs).\"",
  input: IssuesLockInput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PUT", "/repos/{owner}/{repo}/issues/{issue_number}/lock", data)
  },
})
