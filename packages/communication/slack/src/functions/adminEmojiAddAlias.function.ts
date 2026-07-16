import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const AdminEmojiAddAliasInput = z.object({
  alias_for: z.string().describe("The alias of the emoji."),
  name: z.string().describe("The name of the emoji to be aliased. Colons (`:myemoji:`) around the value are not required, although they may be included."),
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:write`"),
})

export const AdminEmojiAddAliasOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminEmojiAddAlias = pikkuSessionlessFunc({
  description: "Add an emoji alias.",
  input: AdminEmojiAddAliasInput,
  output: AdminEmojiAddAliasOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/admin.emoji.addAlias", data) as any
  },
})
