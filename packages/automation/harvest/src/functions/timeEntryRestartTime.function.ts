import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryRestartTimeInput = z.object({
  id: z.string(),
})

export const TimeEntryRestartTimeOutput = z.record(z.string(), z.unknown())

export const timeEntryRestartTime = pikkuSessionlessFunc({
  description: "Time entry restart time",
  input: TimeEntryRestartTimeInput,
  output: TimeEntryRestartTimeOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/time_entries/{id}/restart", data) as any
  },
})
