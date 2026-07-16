import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryStopTimeInput = z.object({
  id: z.string(),
})

export const TimeEntryStopTimeOutput = z.record(z.string(), z.unknown())

export const timeEntryStopTime = pikkuSessionlessFunc({
  description: "Time entry stop time",
  input: TimeEntryStopTimeInput,
  output: TimeEntryStopTimeOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/time_entries/{id}/stop", data) as any
  },
})
