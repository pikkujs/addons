import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ConversationsRepliesInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:history`"),
  channel: z.string().optional().describe("Conversation ID to fetch thread from."),
  ts: z.number().optional().describe("Unique identifier of a thread's parent message. `ts` must be the timestamp of an existing message with 0 or more replies. If there are no replies then just the single message referenced by `ts` will return - it is just an ordinary, unthreaded message."),
  latest: z.number().optional().describe("End of time range of messages to include in results."),
  oldest: z.number().optional().describe("Start of time range of messages to include in results."),
  inclusive: z.boolean().optional().describe("Include messages with latest or oldest timestamp in results only when either timestamp is specified."),
  limit: z.number().int().optional().describe("The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached."),
  cursor: z.string().optional().describe("Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."),
})

export const ConversationsRepliesOutput = z.object({
  has_more: z.boolean().optional(),
  messages: z.array(z.unknown()),
  ok: z.literal(true),
}).describe("Schema for successful response from conversations.replies method")

export const conversationsReplies = pikkuSessionlessFunc({
  description: "Retrieve a thread of messages posted to a conversation",
  input: ConversationsRepliesInput,
  output: ConversationsRepliesOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/conversations.replies", data) as any
  },
})
