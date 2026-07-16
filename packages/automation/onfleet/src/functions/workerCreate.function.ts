import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorkerCreateInput = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
})

export const WorkerCreateOutput = z.record(z.string(), z.unknown())

export const workerCreate = pikkuSessionlessFunc({
  description: "Create a worker",
  input: WorkerCreateInput,
  output: WorkerCreateOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("POST", "/workers", data) as any
  },
})
