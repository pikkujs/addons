import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const WorkerGetScheduleInput = z.object({
  workerId: z.string(),
})

export const WorkerGetScheduleOutput = z.record(z.string(), z.unknown())

export const workerGetSchedule = pikkuSessionlessFunc({
  description: "Get the schedule for a worker",
  input: WorkerGetScheduleInput,
  output: WorkerGetScheduleOutput,
  func: async ({ onfleet }, data) => {
    return onfleet.call("GET", "/workers/{workerId}/schedule", data) as any
  },
})
