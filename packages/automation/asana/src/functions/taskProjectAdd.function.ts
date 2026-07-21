import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskProjectAddInput = z.object({
  taskId: z.string(),
  project: z.string().optional(),
})

export const TaskProjectAddOutput = z.record(z.string(), z.unknown())

export const taskProjectAdd = pikkuSessionlessFunc({
  description: "Task project add",
  input: TaskProjectAddInput,
  output: TaskProjectAddOutput,
  func: async ({ asana }, data) => {
    return asana.call("POST", "/tasks/{taskId}/addProject", data) as any
  },
})
