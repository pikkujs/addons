import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TaskProjectRemoveInput = z.object({
  taskId: z.string(),
  project: z.string().optional(),
})

export const TaskProjectRemoveOutput = z.record(z.string(), z.unknown())

export const taskProjectRemove = pikkuSessionlessFunc({
  description: "Task project remove",
  input: TaskProjectRemoveInput,
  output: TaskProjectRemoveOutput,
  func: async ({ asana }, data) => {
    return asana.call("POST", "/tasks/{taskId}/removeProject", data) as any
  },
})
