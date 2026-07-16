import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgUsersFollowerDeleteInput = z.object({
  userId: z.string(),
  fk_follower_id: z.string().optional(),
})

export const orgUsersFollowerDelete = pikkuSessionlessFunc({
  description: "Delete Organisation User Follower Relationship (Unfollow)",
  input: OrgUsersFollowerDeleteInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("DELETE", "/api/v1/users/{userId}/follower", data)
  },
})
