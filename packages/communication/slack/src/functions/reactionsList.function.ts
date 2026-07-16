import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ReactionsListInput = z.object({
  token: z.string().describe("Authentication token. Requires scope: `reactions:read`"),
  user: z.string().optional().describe("Show reactions made by this user. Defaults to the authed user."),
  full: z.boolean().optional().describe("If true always return the complete reaction list."),
  count: z.number().int().optional(),
  page: z.number().int().optional(),
  cursor: z.string().optional().describe("Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more details."),
  limit: z.number().int().optional().describe("The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached."),
})

export const ReactionsListOutput = z.object({
  items: z.array(z.unknown()),
  ok: z.literal(true),
  paging: z.object({
    count: z.number().int().optional(),
    page: z.number().int(),
    pages: z.number().int().optional(),
    per_page: z.number().int().optional(),
    spill: z.number().int().optional(),
    total: z.number().int(),
  }).optional(),
  response_metadata: z.unknown().optional(),
}).describe("Schema for successful response from reactions.list method")

export const reactionsList = pikkuSessionlessFunc({
  description: "Lists reactions made by a user.",
  input: ReactionsListInput,
  output: ReactionsListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/reactions.list", data) as any
  },
})
