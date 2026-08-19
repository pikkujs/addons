import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DialogOpenInput = z.object({
  dialog: z.string().describe("The dialog definition. This must be a JSON-encoded string."),
  trigger_id: z.string().describe("Exchange a trigger to post to the user."),
  token: z.string().describe("Authentication token. Requires scope: `none`"),
})

export const DialogOpenOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from dialog.open method")

export const dialogOpen = pikkuSessionlessFunc({
  description: "Open a dialog with a user",
  input: DialogOpenInput,
  output: DialogOpenOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/dialog.open", data) as any
  },
})
