import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminEmojiAddInput = z.object({
  name: z.string().describe("The name of the emoji to be removed. Colons (`:myemoji:`) around the value are not required, although they may be included."),
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
  url: z.string().describe("The URL of a file to use as an image for the emoji. Square images under 128KB and with transparent backgrounds work best."),
})

export const AdminEmojiAddOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminEmojiAdd = pikkuSessionlessFunc({
  description: "Add an emoji.",
  input: AdminEmojiAddInput,
  output: AdminEmojiAddOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.emoji.add", data) as any
  },
})
