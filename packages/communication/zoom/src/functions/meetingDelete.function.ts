import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MeetingDeleteInput = z.object({
  meetingId: z.string(),
  occurrence_id: z.string().optional(),
})

export const MeetingDeleteOutput = z.record(z.string(), z.unknown())

export const meetingDelete = pikkuSessionlessFunc({
  description: "Delete a meeting",
  input: MeetingDeleteInput,
  output: MeetingDeleteOutput,
  func: async ({ zoom }, data) => {
    return zoom.call("DELETE", "/meetings/{meetingId}", data) as any
  },
})
