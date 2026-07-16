import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryGetAllInput = z.object({
  teamId: z.string(),
})

export const TimeEntryGetAllOutput = z.record(z.string(), z.unknown())

export const timeEntryGetAll = pikkuSessionlessFunc({
  description: "Time entry get all",
  input: TimeEntryGetAllInput,
  output: TimeEntryGetAllOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/team/{teamId}/time_entries", data) as any
  },
})
