import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskDeleteInput = z.object({
  id: z.string(),
})

export const TaskDeleteOutput = z.record(z.string(), z.unknown())

export const taskDelete = pikkuSessionlessFunc({
  description: "Task delete",
  input: TaskDeleteInput,
  output: TaskDeleteOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/tasks/{id}", data) as any
  },
})
