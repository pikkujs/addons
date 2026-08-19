import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryGetInput = z.object({
  teamId: z.string(),
  timeEntryId: z.string(),
})

export const TimeEntryGetOutput = z.record(z.string(), z.unknown())

export const timeEntryGet = pikkuSessionlessFunc({
  description: "Time entry get",
  input: TimeEntryGetInput,
  output: TimeEntryGetOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("GET", "/team/{teamId}/time_entries/{timeEntryId}", data) as any
  },
})
