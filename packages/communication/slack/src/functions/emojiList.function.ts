import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const EmojiListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `emoji:read`"),
})

export const EmojiListOutput = z.object({
  ok: z.literal(true),
}).describe("This method either only returns a brief _OK_ response or a verbose schema is not available for this method.")

export const emojiList = pikkuSessionlessFunc({
  description: "Lists custom emoji for a team.",
  input: EmojiListInput,
  output: EmojiListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/emoji.list", data) as any
  },
})
