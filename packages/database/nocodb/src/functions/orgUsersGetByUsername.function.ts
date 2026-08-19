import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrgUsersGetByUsernameInput = z.object({
  username: z.string(),
})

export const OrgUsersGetByUsernameOutput = z.object({
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
}).describe("Model for User")

export const orgUsersGetByUsername = pikkuSessionlessFunc({
  description: "Organisation User GetByUsername",
  input: OrgUsersGetByUsernameInput,
  output: OrgUsersGetByUsernameOutput,
  func: async ({ nocodb }, data) => {
    return nocodb.call("GET", "/api/v1/users/{username}", data) as any
  },
})
