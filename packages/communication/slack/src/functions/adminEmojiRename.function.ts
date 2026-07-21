import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminEmojiRenameInput = z.object({
  name: z.string().describe("The name of the emoji to be renamed. Colons (`:myemoji:`) around the value are not required, although they may be included."),
  new_name: z.string().describe("The new name of the emoji."),
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
})

export const AdminEmojiRenameOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminEmojiRename = pikkuSessionlessFunc({
  description: "Rename an emoji.",
  input: AdminEmojiRenameInput,
  output: AdminEmojiRenameOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.emoji.rename", data) as any
  },
})
