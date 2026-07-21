import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryDeleteInput = z.object({
  teamId: z.string(),
  timeEntryId: z.string(),
})

export const TimeEntryDeleteOutput = z.record(z.string(), z.unknown())

export const timeEntryDelete = pikkuSessionlessFunc({
  description: "Time entry delete",
  input: TimeEntryDeleteInput,
  output: TimeEntryDeleteOutput,
  func: async ({ clickup }, data) => {
    return clickup.call("DELETE", "/team/{teamId}/time_entries/{timeEntryId}", data) as any
  },
})
