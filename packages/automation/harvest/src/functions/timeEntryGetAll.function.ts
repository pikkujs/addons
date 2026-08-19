import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const TimeEntryGetAllOutput = z.record(z.string(), z.unknown())

export const timeEntryGetAll = pikkuSessionlessFunc({
  description: "Time entry get all",
  output: TimeEntryGetAllOutput,
  func: async ({ harvest }) => {
    return harvest.call("GET", "/time_entries") as any
  },
})
