import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskCommentRemoveInput = z.object({
  commentId: z.string(),
})

export const TaskCommentRemoveOutput = z.record(z.string(), z.unknown())

export const taskCommentRemove = pikkuSessionlessFunc({
  description: "Task comment remove",
  input: TaskCommentRemoveInput,
  output: TaskCommentRemoveOutput,
  func: async ({ asana }, data) => {
    return asana.call("DELETE", "/stories/{commentId}", data) as any
  },
})
