// pulls — Interact with GitHub Pull Requests.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const PullsDeleteReviewCommentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  comment_id: z.number().int().describe("The unique identifier of the comment."),
})

export const pullsDeleteReviewComment = pikkuSessionlessFunc({
  description: "Deletes a review comment.",
  input: PullsDeleteReviewCommentInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/pulls/comments/{comment_id}", data)
  },
})
