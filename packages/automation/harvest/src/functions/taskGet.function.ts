import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetInput = z.object({
  id: z.string(),
})

export const TaskGetOutput = z.record(z.string(), z.unknown())

export const taskGet = pikkuSessionlessFunc({
  description: "Task get",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("GET", "/tasks/{id}", data) as any
  },
})
