import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetAllInput = z.object({
  page_number: z.number().optional(),
  page_size: z.number().optional(),
})

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "List tasks",
  input: TaskGetAllInput,
  output: TaskGetAllOutput,
  func: async ({ copper }, data) => {
    return copper.call("POST", "/tasks/search", data) as any
  },
})
