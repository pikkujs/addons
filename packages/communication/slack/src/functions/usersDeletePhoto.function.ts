import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersDeletePhotoInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `users.profile:write`"),
})

export const UsersDeletePhotoOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from users.deletePhoto method")

export const usersDeletePhoto = pikkuSessionlessFunc({
  description: "Delete the user profile photo",
  input: UsersDeletePhotoInput,
  output: UsersDeletePhotoOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/users.deletePhoto", data) as any
  },
})
