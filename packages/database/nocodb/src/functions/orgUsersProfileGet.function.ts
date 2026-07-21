import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrgUsersProfileGetInput = z.object({
  userId: z.string(),
})

export const orgUsersProfileGet = pikkuSessionlessFunc({
  description: "Get Organisation User Profile",
  input: OrgUsersProfileGetInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/users/{userId}/profile", data)
  },
})
