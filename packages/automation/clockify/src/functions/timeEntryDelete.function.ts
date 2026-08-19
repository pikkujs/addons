import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryDeleteInput = z.object({
  workspaceId: z.string(),
  timeEntryId: z.string(),
})

export const TimeEntryDeleteOutput = z.record(z.string(), z.unknown())

export const timeEntryDelete = pikkuSessionlessFunc({
  description: "Delete a time entry",
  input: TimeEntryDeleteInput,
  output: TimeEntryDeleteOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("DELETE", "/workspaces/{workspaceId}/time-entries/{timeEntryId}", data) as any
  },
})
