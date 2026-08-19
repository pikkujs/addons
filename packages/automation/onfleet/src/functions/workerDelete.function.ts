import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WorkerDeleteInput = z.object({
  workerId: z.string(),
})

export const WorkerDeleteOutput = z.record(z.string(), z.unknown())

export const workerDelete = pikkuSessionlessFunc({
  description: "Delete a worker",
  input: WorkerDeleteInput,
  output: WorkerDeleteOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("DELETE", "/workers/{workerId}", data) as any
  },
})
