import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskDeleteInput = z.object({
  id: z.string(),
})

export const TaskDeleteOutput = z.record(z.string(), z.unknown())

export const taskDelete = pikkuSessionlessFunc({
  description: "Delete Task",
  input: TaskDeleteInput,
  output: TaskDeleteOutput,
  func: async ({ salesforce }, data) => {
    return salesforce.call("DELETE", "/sobjects/Task/{id}", data) as any
  },
})
