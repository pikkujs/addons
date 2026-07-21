import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListItamLocationsOutput = z.object({
  locations: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the location record was added"),
    external_id: z.string().nullable().optional().describe("An id you can use to connect a location to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    name: z.string().describe("Display name for the location"),
    updated_at: z.string().datetime().optional().describe("The time of the location's last update"),
    url: z.string().optional().describe("Direct link to the specific location"),
  })).optional(),
  links: z.object({
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }).optional(),
  meta: z.object({
    after_cursor: z.string().nullable(),
    before_cursor: z.string().nullable(),
    has_more: z.boolean(),
  }).optional(),
})

export const listItamLocations = pikkuSessionlessFunc({
  description: "Lists all locations.\n\n#### Pagination\n\n* [Cursor pagination](/api-reference/introduction/pagination/#cursor-pagination) only.\n\n#### Allowed For\n\n* Agents",
  output: ListItamLocationsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/it_asset_management/locations") as any
  },
})
