import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetInput = z.object({
  taskId: z.string(),
})

export const TaskGetOutput = z.record(z.string(), z.unknown())

export const taskGet = pikkuSessionlessFunc({
  description: "Task get",
  input: TaskGetInput,
  output: TaskGetOutput,
  func: async ({ asana }, data) => {
    return asana.call("GET", "/tasks/{taskId}", data) as any
  },
})
