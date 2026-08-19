import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetInput = z.object({
  id: z.string(),
})

export const TaskGetOutput = z.record(z.string(), z.unknown())

export const taskGet = pikkuSessionlessFunc({
  description: "Get a task",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ theHive }, data) => {
    return theHive.call("GET", "/case/task/{id}", data) as any
  },
})
