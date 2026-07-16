import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TaskGetAllOutput = z.record(z.string(), z.unknown())

export const taskGetAll = pikkuSessionlessFunc({
  description: "Get many tasks",
  output: TaskGetAllOutput,
  func: async ({ onfleet }) => {
    return onfleet.call("GET", "/tasks/all") as any
  },
})
