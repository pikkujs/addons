import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ChatScheduledMessagesListInput = z.object({
  channel: z.string().optional().describe("The channel of the scheduled messages"),
  latest: z.number().optional().describe("A UNIX timestamp of the latest value in the time range"),
  oldest: z.number().optional().describe("A UNIX timestamp of the oldest value in the time range"),
  limit: z.number().int().optional().describe("Maximum number of original entries to return."),
  cursor: z.string().optional().describe("For pagination purposes, this is the `cursor` value returned from a previous call to `chat.scheduledmessages.list` indicating where you want to start this call from."),
  token: z.string().optional().describe("Authentication token. Requires scope: `none`"),
})

export const ChatScheduledMessagesListOutput = z.object({
  ok: z.literal(true),
  response_metadata: z.object({
    next_cursor: z.string(),
  }),
  scheduled_messages: z.array(z.object({
    channel_id: z.string().regex(new RegExp("^[C][A-Z0-9]{2,}$")),
    date_created: z.number().int(),
    id: z.string().regex(new RegExp("^[Q][A-Z0-9]{8,}$")),
    post_at: z.number().int(),
    text: z.string().optional(),
  })),
}).describe("Schema for successful response from chat.scheduledMessages.list method")

export const chatScheduledMessagesList = pikkuSessionlessFunc({
  description: "Returns a list of scheduled messages.",
  input: ChatScheduledMessagesListInput,
  output: ChatScheduledMessagesListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/chat.scheduledMessages.list", data) as any
  },
})
