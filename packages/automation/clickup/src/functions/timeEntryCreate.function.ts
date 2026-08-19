import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryCreateInput = z.object({
  teamId: z.string(),
  tid: z.string().optional(),
  start: z.number().optional(),
  duration: z.number().optional(),
})

export const TimeEntryCreateOutput = z.record(z.string(), z.unknown())

export const timeEntryCreate = pikkuSessionlessFunc({
  description: "Time entry create",
  input: TimeEntryCreateInput,
  output: TimeEntryCreateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("POST", "/team/{teamId}/time_entries", data) as any
  },
})
