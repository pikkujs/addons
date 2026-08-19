import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminEmojiRemoveInput = z.object({
  name: z.string().describe("The name of the emoji to be removed. Colons (`:myemoji:`) around the value are not required, although they may be included."),
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
})

export const AdminEmojiRemoveOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminEmojiRemove = pikkuSessionlessFunc({
  description: "Remove an emoji across an Enterprise Grid organization",
  input: AdminEmojiRemoveInput,
  output: AdminEmojiRemoveOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.emoji.remove", data) as any
  },
})
