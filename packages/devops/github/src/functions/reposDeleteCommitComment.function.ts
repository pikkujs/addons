// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ReposDeleteCommitCommentInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  comment_id: z.number().int().describe("The unique identifier of the comment."),
})

export const reposDeleteCommitComment = pikkuSessionlessFunc({
  input: ReposDeleteCommitCommentInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/repos/{owner}/{repo}/comments/{comment_id}", data)
  },
})
