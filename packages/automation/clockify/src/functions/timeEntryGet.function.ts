import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryGetInput = z.object({
  workspaceId: z.string(),
  timeEntryId: z.string(),
})

export const TimeEntryGetOutput = z.record(z.string(), z.unknown())

export const timeEntryGet = pikkuSessionlessFunc({
  description: "Get a time entry",
  input: TimeEntryGetInput,
  output: TimeEntryGetOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("GET", "/workspaces/{workspaceId}/time-entries/{timeEntryId}", data) as any
  },
})
