import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ActivityCreateInput = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  activity_type: z.string().optional(),
  key: z.string().optional(),
  link: z.string().optional(),
  link_text: z.string().optional(),
  occurred_at: z.string().optional(),
})

export const ActivityCreateOutput = z.record(z.string(), z.unknown())

export const activityCreate = pikkuSessionlessFunc({
  description: "Create an activity for a member",
  input: ActivityCreateInput,
  output: ActivityCreateOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("POST", "/{workspaceId}/members/{memberId}/activities", data) as any
  },
})
