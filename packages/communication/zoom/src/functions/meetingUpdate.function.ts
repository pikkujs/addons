import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MeetingUpdateInput = z.object({
  meetingId: z.string(),
  topic: z.string().optional(),
  type: z.number().int().optional(),
  start_time: z.string().optional(),
  duration: z.number().int().optional(),
  timezone: z.string().optional(),
  password: z.string().optional(),
  agenda: z.string().optional(),
})

export const MeetingUpdateOutput = z.record(z.string(), z.unknown())

export const meetingUpdate = pikkuSessionlessFunc({
  description: "Update a meeting",
  input: MeetingUpdateInput,
  output: MeetingUpdateOutput,
  func: async ({ zoom }, data) => {
    return zoom.call("PATCH", "/meetings/{meetingId}", data) as any
  },
})
