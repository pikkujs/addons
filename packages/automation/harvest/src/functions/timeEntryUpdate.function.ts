import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryUpdateInput = z.object({
  id: z.string(),
  notes: z.string().optional(),
})

export const TimeEntryUpdateOutput = z.record(z.string(), z.unknown())

export const timeEntryUpdate = pikkuSessionlessFunc({
  description: "Time entry update",
  input: TimeEntryUpdateInput,
  output: TimeEntryUpdateOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("PATCH", "/time_entries/{id}", data) as any
  },
})
