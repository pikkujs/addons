import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskDeleteInput = z.object({
  id: z.string(),
})

export const TaskDeleteOutput = z.record(z.string(), z.unknown())

export const taskDelete = pikkuSessionlessFunc({
  description: "TaskDelete",
  input: TaskDeleteInput,
  output: TaskDeleteOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("DELETE", "/tasks/{id}", data) as any
  },
})
