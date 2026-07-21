import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskUpdateInput = z.object({
  id: z.string(),
  subject: z.string().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "TaskUpdate",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("PATCH", "/tasks/{id}", data) as any
  },
})
