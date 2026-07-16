import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryStartInput = z.object({
  teamId: z.string(),
  tid: z.string().optional(),
})

export const TimeEntryStartOutput = z.record(z.string(), z.unknown())

export const timeEntryStart = pikkuSessionlessFunc({
  description: "Time entry start",
  input: TimeEntryStartInput,
  output: TimeEntryStartOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/team/{teamId}/time_entries/start", data) as any
  },
})
