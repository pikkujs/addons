import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SubtaskGetAllInput = z.object({
  taskId: z.string(),
  limit: z.number().int().optional(),
})

export const SubtaskGetAllOutput = z.record(z.string(), z.unknown())

export const subtaskGetAll = pikkuSessionlessFunc({
  description: "Subtask get all",
  input: SubtaskGetAllInput,
  output: SubtaskGetAllOutput,
  func: async ({ asana }, data) => {
    return asana.call("GET", "/tasks/{taskId}/subtasks", data) as any
  },
})
