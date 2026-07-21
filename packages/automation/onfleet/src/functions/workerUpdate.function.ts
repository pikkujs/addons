import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorkerUpdateInput = z.object({
  workerId: z.string(),
  name: z.string().optional(),
})

export const WorkerUpdateOutput = z.record(z.string(), z.unknown())

export const workerUpdate = pikkuSessionlessFunc({
  description: "Update a worker",
  input: WorkerUpdateInput,
  output: WorkerUpdateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("PUT", "/workers/{workerId}", data) as any
  },
})
