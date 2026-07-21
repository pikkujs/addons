import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorkerGetAllOutput = z.record(z.string(), z.unknown())

export const workerGetAll = pikkuSessionlessFunc({
  description: "Get many workers",
  output: WorkerGetAllOutput,
  func: async ({ onfleet }) => {
    return onfleet.call("GET", "/workers") as any
  },
})
