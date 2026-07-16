import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersSetPhotoInput = z.object({
  crop_w: z.string().optional().describe("Width/height of crop box (always square)"),
  crop_x: z.string().optional().describe("X coordinate of top-left corner of crop box"),
  crop_y: z.string().optional().describe("Y coordinate of top-left corner of crop box"),
  image: z.string().optional().describe("File contents via `multipart/form-data`."),
  token: z.string().describe("Authentication token. Requires scope: `users.profile:write`"),
})

export const UsersSetPhotoOutput = z.object({
  ok: z.literal(true),
  profile: z.object({
    avatar_hash: z.string().regex(new RegExp("^[0-9a-f]{12}$")),
    image_1024: z.string().url(),
    image_192: z.string().url(),
    image_24: z.string().url(),
    image_32: z.string().url(),
    image_48: z.string().url(),
    image_512: z.string().url(),
    image_72: z.string().url(),
    image_original: z.string().url(),
  }),
}).describe("Schema for successful response from users.setPhoto method")

export const usersSetPhoto = pikkuSessionlessFunc({
  description: "Set the user profile photo",
  input: UsersSetPhotoInput,
  output: UsersSetPhotoOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/users.setPhoto", data) as any
  },
})
