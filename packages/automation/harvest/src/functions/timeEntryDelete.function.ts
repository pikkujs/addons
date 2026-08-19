import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryDeleteInput = z.object({
  id: z.string(),
})

export const TimeEntryDeleteOutput = z.record(z.string(), z.unknown())

export const timeEntryDelete = pikkuSessionlessFunc({
  description: "Time entry delete",
  input: TimeEntryDeleteInput,
  output: TimeEntryDeleteOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("DELETE", "/time_entries/{id}", data) as any
  },
})
