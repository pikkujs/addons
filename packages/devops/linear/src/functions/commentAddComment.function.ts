import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CommentAddCommentInput = z.object({
  issueId: z.string().optional(),
  comment: z.string().optional(),
  parentId: z.string().optional(),
})

export const CommentAddCommentOutput = z.record(z.string(), z.unknown())

export const commentAddComment = pikkuSessionlessFunc({
  description: "Add a comment to an issue",
  input: CommentAddCommentInput,
  output: CommentAddCommentOutput,
  func: async ({ linear }, data) => {
    return linear.call("POST", "/graphql/comment/addComment", data) as any
  },
})
