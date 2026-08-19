import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrgUsersFollowingListInput = z.object({
  userId: z.string(),
})

export const orgUsersFollowingList = pikkuSessionlessFunc({
  description: "List Organisation User Following",
  input: OrgUsersFollowingListInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/users/{userId}/following", data)
  },
})
