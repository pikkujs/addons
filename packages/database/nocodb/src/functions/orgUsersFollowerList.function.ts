import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgUsersFollowerListInput = z.object({
  userId: z.string(),
  fk_follower_id: z.string().optional(),
})

export const orgUsersFollowerList = pikkuSessionlessFunc({
  description: "List Organisation User Followers",
  input: OrgUsersFollowerListInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/users/{userId}/follower", data)
  },
})
