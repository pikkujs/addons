import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryCreateInput = z.object({
  workspaceId: z.string(),
  start: z.string().optional(),
  end: z.string().optional(),
  description: z.string().optional(),
})

export const TimeEntryCreateOutput = z.record(z.string(), z.unknown())

export const timeEntryCreate = pikkuSessionlessFunc({
  description: "Create a time entry",
  input: TimeEntryCreateInput,
  output: TimeEntryCreateOutput,
  func: async ({ clockify }, data) => {
    return clockify.call("POST", "/workspaces/{workspaceId}/time-entries", data) as any
  },
})
