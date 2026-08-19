import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ChatDeleteScheduledMessageInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `chat:write`"),
  as_user: z.boolean().optional().describe("Pass true to delete the message as the authed user with `chat:write:user` scope. [Bot users](/bot-users) in this context are considered authed users. If unused or false, the message will be deleted with `chat:write:bot` scope."),
  channel: z.string().describe("The channel the scheduled_message is posting to"),
  scheduled_message_id: z.string().describe("`scheduled_message_id` returned from call to chat.scheduleMessage"),
})

export const ChatDeleteScheduledMessageOutput = z.object({
  ok: z.literal(true),
}).describe("Schema for successful response from chat.deleteScheduledMessage method")

export const chatDeleteScheduledMessage = pikkuSessionlessFunc({
  description: "Deletes a pending scheduled message from the queue.",
  input: ChatDeleteScheduledMessageInput,
  output: ChatDeleteScheduledMessageOutput,
  func: async ({ slack }, data) => {
    return slack.call("POST", "/chat.deleteScheduledMessage", data) as any
  },
})
