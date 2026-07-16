import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "Task get all",
  output: TaskGetAllOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/tasks") as any
  },
})
