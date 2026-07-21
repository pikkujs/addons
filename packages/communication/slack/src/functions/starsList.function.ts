import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const StarsListInput = z.object({
  token: z.string().optional().describe("Authentication token. Requires scope: `stars:read`"),
  count: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional().describe("Parameter for pagination. Set `cursor` equal to the `next_cursor` attribute returned by the previous request's `response_metadata`. This parameter is optional, but pagination is mandatory: the default value simply fetches the first \"page\" of the collection. See [pagination](/docs/pagination) for more details."),
  limit: z.number().int().optional().describe("The maximum number of items to return. Fewer than the requested number of items may be returned, even if the end of the list hasn't been reached."),
})

export const StarsListOutput = z.object({
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
}).describe("Schema for successful response from stars.list method")

export const starsList = pikkuSessionlessFunc({
  description: "Lists stars for a user.",
  input: StarsListInput,
  output: StarsListOutput,
  func: async ({ slack }, data) => {
    return slack.call("GET", "/stars.list", data) as any
  },
})
