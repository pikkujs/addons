import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskUpdateInput = z.object({
  id: z.string(),
  name: z.string().optional(),
})

export const TaskUpdateOutput = z.record(z.string(), z.unknown())

export const taskUpdate = pikkuSessionlessFunc({
  description: "Task update",
  input: TaskUpdateInput,
  output: TaskUpdateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/tasks/{id}", data) as any
  },
})
