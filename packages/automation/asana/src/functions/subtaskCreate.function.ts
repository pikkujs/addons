import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SubtaskCreateInput = z.object({
  taskId: z.string(),
  name: z.string().optional(),
})

export const SubtaskCreateOutput = z.record(z.string(), z.unknown())

export const subtaskCreate = pikkuSessionlessFunc({
  description: "Subtask create",
  input: SubtaskCreateInput,
  output: SubtaskCreateOutput,
  func: async ({ asana }, data) => {
    return asana.call("POST", "/tasks/{taskId}/subtasks", data) as any
  },
})
