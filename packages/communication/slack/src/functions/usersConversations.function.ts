import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersConversationsInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `conversations:read`"),
  user: z.string().optional().describe("Browse conversations by a specific user ID's membership. Non-public channels are restricted to those where the calling user shares membership."),
  types: z.string().optional().describe("Mix and match channel types by providing a comma-separated list of any combination of `public_channel`, `private_channel`, `mpim`, `im`"),
  exclude_archived: z.boolean().optional().describe("Set to `true` to exclude archived channels from the list"),
  limit: z.number().int().optional().describe("The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached. Must be an integer no larger than 1000."),
  cursor: z.string().optional().describe("Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."),
})

export const UsersConversationsOutput = z.object({
  channels: z.array(z.unknown()),
  ok: z.literal(true),
  response_metadata: z.object({
    next_cursor: z.string(),
  }).optional(),
}).describe("Schema for successful response from users.conversations method. Returned conversation objects do not include `num_members` or `is_member`")

export const usersConversations = pikkuSessionlessFunc({
  description: "List conversations the calling user may access.",
  input: UsersConversationsInput,
  output: UsersConversationsOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/users.conversations", data) as any
  },
})
