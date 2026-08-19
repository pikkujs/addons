import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AdminEmojiListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `admin.teams:read`"),
  cursor: z.string().optional().describe("Set `cursor` to `next_cursor` returned by the previous call to list items in the next page"),
  limit: z.number().int().optional().describe("The maximum number of items to return. Must be between 1 - 1000 both inclusive."),
})

export const AdminEmojiListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const adminEmojiList = pikkuSessionlessFunc({
  description: "List emoji for an Enterprise Grid organization.",
  input: AdminEmojiListInput,
  output: AdminEmojiListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/admin.emoji.list", data) as any
  },
})
