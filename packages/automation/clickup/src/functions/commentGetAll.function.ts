import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CommentGetAllInput = z.object({
  taskId: z.string(),
  limit: z.number().optional(),
})

export const CommentGetAllOutput = z.record(z.string(), z.unknown())

export const commentGetAll = pikkuSessionlessFunc({
  description: "Comment get all",
  input: CommentGetAllInput,
  output: CommentGetAllOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/task/{taskId}/comment", data) as any
  },
})
