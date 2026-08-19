import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChatDeleteInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `chat:write`"),
  as_user: z.boolean().optional().describe("Pass true to delete the message as the authed user with `chat:write:user` scope. [Bot users](/bot-users) in this context are considered authed users. If unused or false, the message will be deleted with `chat:write:bot` scope."),
  channel: z.string().optional().describe("Channel containing the message to be deleted."),
  ts: z.number().optional().describe("Timestamp of the message to be deleted."),
})

export const ChatDeleteOutput = z.object({
  channel: z.string().regex(new RegExp("^[CGD][A-Z0-9]{8,}$")),
  ok: z.literal(true),
  ts: z.string().regex(new RegExp("^\\d{10}\\.\\d{6}$")),
}).describe("Schema for successful response of chat.delete method")

export const chatDelete = pikkuSessionlessFunc({
  description: "Deletes a message.",
  input: ChatDeleteInput,
  output: ChatDeleteOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/chat.delete", data) as any
  },
})
