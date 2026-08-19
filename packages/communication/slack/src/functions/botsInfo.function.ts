import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const BotsInfoInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `users:read`"),
  bot: z.string().optional().describe("Bot user to get info on"),
})

export const BotsInfoOutput = z.object({
  bot: z.object({
    app_id: z.string().regex(new RegExp("^A[A-Z0-9]{1,}$")),
    deleted: z.boolean(),
    icons: z.object({
      image_36: z.string().url(),
      image_48: z.string().url(),
      image_72: z.string().url(),
    }),
    id: z.string().regex(new RegExp("^B[A-Z0-9]{8,}$")),
    name: z.string(),
    updated: z.number().int(),
    user_id: z.string().regex(new RegExp("^[UW][A-Z0-9]{2,}$")).optional(),
  }),
  ok: z.literal(true),
}).describe("Schema for successful response from bots.info method")

export const botsInfo = pikkuSessionlessFunc({
  description: "Gets information about a bot user.",
  input: BotsInfoInput,
  output: BotsInfoOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/bots.info", data) as any
  },
})
