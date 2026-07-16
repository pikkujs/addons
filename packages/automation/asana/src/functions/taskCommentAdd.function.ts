import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskCommentAddInput = z.object({
  taskId: z.string(),
  text: z.string().optional(),
  html_text: z.string().optional(),
})

export const TaskCommentAddOutput = z.record(z.string(), z.unknown())

export const taskCommentAdd = pikkuSessionlessFunc({
  description: "Task comment add",
  input: TaskCommentAddInput,
  output: TaskCommentAddOutput,
  func: async ({ asana }, data) => {
    return asana.call("POST", "/tasks/{taskId}/stories", data) as any
  },
})
