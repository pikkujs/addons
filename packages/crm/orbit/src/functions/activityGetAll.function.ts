import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ActivityGetAllInput = z.object({
  workspaceId: z.string(),
  member_id: z.string().optional(),
  page: z.number().optional(),
})

export const ActivityGetAllOutput = z.record(z.string(), z.unknown())

export const activityGetAll = pikkuSessionlessFunc({
  description: "Get many activities",
  input: ActivityGetAllInput,
  output: ActivityGetAllOutput,
  func: async ({ orbit }, data) => {
    return orbit.call("GET", "/{workspaceId}/activities", data) as any
  },
})
