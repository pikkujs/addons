import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MeetingCreateInput = z.object({
  topic: z.string().optional(),
  type: z.number().int().optional(),
  start_time: z.string().optional(),
  duration: z.number().int().optional(),
  timezone: z.string().optional(),
  password: z.string().optional(),
  agenda: z.string().optional(),
})

export const MeetingCreateOutput = z.record(z.string(), z.unknown())

export const meetingCreate = pikkuSessionlessFunc({
  description: "Create a meeting",
  input: MeetingCreateInput,
  output: MeetingCreateOutput,
  func: async ({ zoom }, data) => {
    return zoom.call("POST", "/users/me/meetings", data) as any
  },
})
