import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrgUsersIsFollowingInput = z.object({
  userId: z.string(),
  followerId: z.string(),
})

export const orgUsersIsFollowing = pikkuSessionlessFunc({
  description: "Check if Organisation User is following someone",
  input: OrgUsersIsFollowingInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/users/{userId}/isFollowing/{followerId}", data)
  },
})
