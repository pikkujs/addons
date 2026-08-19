import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryGetInput = z.object({
  id: z.string(),
})

export const TimeEntryGetOutput = z.record(z.string(), z.unknown())

export const timeEntryGet = pikkuSessionlessFunc({
  description: "Time entry get",
  input: TimeEntryGetInput,
  output: TimeEntryGetOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("GET", "/time_entries/{id}", data) as any
  },
})
