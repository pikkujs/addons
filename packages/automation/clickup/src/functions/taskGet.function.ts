import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskGetInput = z.object({
  taskId: z.string(),
})

export const TaskGetOutput = z.record(z.string(), z.unknown())

export const taskGet = pikkuSessionlessFunc({
  description: "Task get",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/task/{taskId}", data) as any
  },
})
