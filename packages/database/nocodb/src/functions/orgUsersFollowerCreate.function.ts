import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgUsersFollowerCreateInput = z.object({
  userId: z.string(),
  fk_follower_id: z.string().optional(),
})

export const orgUsersFollowerCreate = pikkuSessionlessFunc({
  description: "Create Organisation User Follower Relationship (Follow)",
  input: OrgUsersFollowerCreateInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("POST", "/api/v1/users/{userId}/follower", data)
  },
})
