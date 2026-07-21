import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetInput = z.object({
  id: z.string(),
})

export const TaskGetOutput = z.record(z.string(), z.unknown())

export const taskGet = pikkuSessionlessFunc({
  description: "TaskGet",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("GET", "/tasks/{id}", data) as any
  },
})
