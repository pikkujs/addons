import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UserProfileUpdateInput = z.object({
  id: z.string().describe("Unique identifier for the given user."),
  email: z.string().email(),
  roles: z.string().optional(),
  email_verified: z.boolean().describe("Set to true if the user's email has been verified."),
  created_at: z.string().date().optional().describe("The date that the user was created."),
  updated_at: z.string().date().optional().describe("The date that the user was created."),
  display_name: z.string().optional(),
  user_name: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  avatar: z.string().optional(),
  is_new_user: z.boolean().optional(),
  token_version: z.string().optional().describe("Access token version"),
  meta: z.union([z.unknown(), z.record(z.string(), z.unknown()), z.string()]).optional().describe("Meta data for user"),
})

export const userProfileUpdate = pikkuSessionlessFunc({
  description: "Update User Profile",
  input: UserProfileUpdateInput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("PATCH", "/api/v1/user/profile", data)
  },
})
