import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryUpdateInput = z.object({
  workspaceId: z.string(),
  timeEntryId: z.string(),
  start: z.string().optional(),
  end: z.string().optional(),
  description: z.string().optional(),
})

export const TimeEntryUpdateOutput = z.record(z.string(), z.unknown())

export const timeEntryUpdate = pikkuSessionlessFunc({
  description: "Update a time entry",
  input: TimeEntryUpdateInput,
  output: TimeEntryUpdateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("PUT", "/workspaces/{workspaceId}/time-entries/{timeEntryId}", data) as any
  },
})
