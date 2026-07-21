import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MeetingGetInput = z.object({
  meetingId: z.string(),
  occurrence_id: z.string().optional(),
  show_previous_occurrences: z.boolean().optional(),
})

export const MeetingGetOutput = z.record(z.string(), z.unknown())

export const meetingGet = pikkuSessionlessFunc({
  description: "Get a meeting",
  input: MeetingGetInput,
  output: MeetingGetOutput,
  func: async ({ zoom }, data) => {
    return zoom.call("GET", "/meetings/{meetingId}", data) as any
  },
})
