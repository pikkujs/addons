import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const UsersListInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `users:read`"),
  limit: z.number().int().optional().describe("The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the users list hasn't been reached. Providing no `limit` value will result in Slack attempting to deliver you the entire result set. If the collection is too large you may experience `limit_required` or HTTP 500 errors."),
  cursor: z.string().optional().describe("Paginate through collections of data by setting the `cursor` parameter to a `next_cursor` attribute returned by a previous request's `response_metadata`. Default value fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more detail."),
  include_locale: z.boolean().optional().describe("Set this to `true` to receive the locale for users. Defaults to `false`"),
})

export const UsersListOutput = z.object({
  cache_ts: z.number().int(),
  members: z.array(z.unknown()).min(1),
  ok: z.literal(true),
  response_metadata: z.unknown().optional(),
}).describe("Schema for successful response from users.list method")

export const usersList = pikkuSessionlessFunc({
  description: "Lists all users in a Slack team.",
  input: UsersListInput,
  output: UsersListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/users.list", data) as any
  },
})
