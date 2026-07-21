import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryCreateByStartEndInput = z.object({
  project_id: z.string().optional(),
  task_id: z.string().optional(),
  spent_date: z.string().optional(),
})

export const TimeEntryCreateByStartEndOutput = z.record(z.string(), z.unknown())

export const timeEntryCreateByStartEnd = pikkuSessionlessFunc({
  description: "Time entry create by start end",
  input: TimeEntryCreateByStartEndInput,
  output: TimeEntryCreateByStartEndOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/time_entries", data) as any
  },
})
