import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetAllInput = z.object({
  project: z.string().optional(),
})

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "TaskGetAll",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ taiga }, data) => {
    return taiga.call("GET", "/tasks", data) as any
  },
})
