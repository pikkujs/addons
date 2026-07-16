import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const TimeEntryCreateByDurationInput = z.object({
  project_id: z.string().optional(),
  task_id: z.string().optional(),
  spent_date: z.string().optional(),
})

export const TimeEntryCreateByDurationOutput = z.record(z.string(), z.unknown())

export const timeEntryCreateByDuration = pikkuSessionlessFunc({
  description: "Time entry create by duration",
  input: TimeEntryCreateByDurationInput,
  output: TimeEntryCreateByDurationOutput,
  func: async ({ harvest }, data) => {
    return harvest.call("POST", "/time_entries/duration", data) as any
  },
})
