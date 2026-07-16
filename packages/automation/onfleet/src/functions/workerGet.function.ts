import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WorkerGetInput = z.object({
  workerId: z.string(),
})

export const WorkerGetOutput = z.record(z.string(), z.unknown())

export const workerGet = pikkuSessionlessFunc({
  description: "Get a worker",
  input: WorkerGetInput,
  output: WorkerGetOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("GET", "/workers/{workerId}", data) as any
  },
})
