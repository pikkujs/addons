import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryUpdateInput = z.object({
  teamId: z.string(),
  timeEntryId: z.string(),
  description: z.string().optional(),
  duration: z.number().optional(),
})

export const TimeEntryUpdateOutput = z.record(z.string(), z.unknown())

export const timeEntryUpdate = pikkuSessionlessFunc({
  description: "Time entry update",
  input: TimeEntryUpdateInput,
  output: TimeEntryUpdateOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("PUT", "/team/{teamId}/time_entries/{timeEntryId}", data) as any
  },
})
