import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MeetingGetAllInput = z.object({
  type: z.string().optional(),
  page_size: z.number().int().optional(),
  page_number: z.number().int().optional(),
})

export const MeetingGetAllOutput = z.record(z.string(), z.unknown())

export const meetingGetAll = pikkuSessionlessFunc({
  description: "Get many meetings",
  input: MeetingGetAllInput,
  output: MeetingGetAllOutput,
  func: async ({ zoom }, data) => {
    return zoom.call("GET", "/users/me/meetings", data) as any
  },
})
