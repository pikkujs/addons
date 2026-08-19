import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CommentCreateInput = z.object({
  taskId: z.string(),
  comment_text: z.string().optional(),
})

export const CommentCreateOutput = z.record(z.string(), z.unknown())

export const commentCreate = pikkuSessionlessFunc({
  description: "Comment create",
  input: CommentCreateInput,
  output: CommentCreateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/task/{taskId}/comment", data) as any
  },
})
