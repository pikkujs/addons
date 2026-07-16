import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetInput = z.object({
  id: z.string(),
})

export const TaskGetOutput = z.record(z.string(), z.unknown())

export const taskGet = pikkuSessionlessFunc({
  description: "Get Task",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("GET", "/sobjects/Task/{id}", data) as any
  },
})
