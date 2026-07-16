import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ConversationsMembersInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:read`"),
  channel: z.string().optional().describe("ID of the conversation to retrieve members for"),
  limit: z.number().int().optional().describe("The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached."),
  cursor: z.string().optional().describe("Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."),
})

export const ConversationsMembersOutput = z.object({
  members: z.array(z.string()).min(1),
  ok: z.literal(true),
  response_metadata: z.object({
    next_cursor: z.string(),
  }),
}).describe("Schema for successful response conversations.members method")

export const conversationsMembers = pikkuSessionlessFunc({
  description: "Retrieve members of a conversation.",
  input: ConversationsMembersInput,
  output: ConversationsMembersOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/conversations.members", data) as any
  },
})
