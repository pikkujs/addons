import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowItamLocationInput = z.object({
  location_id: z.string().describe("The id of the location. Example: \"01KBFXPX2QFYZSSC1TMF3Q6T68\""),
})

export const ShowItamLocationOutput = z.object({
  location: z.object({
    created_at: z.string().datetime().optional().describe("The time the location record was added"),
    external_id: z.string().nullable().optional().describe("An id you can use to connect a location to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    name: z.string().describe("Display name for the location"),
    updated_at: z.string().datetime().optional().describe("The time of the location's last update"),
    url: z.string().optional().describe("Direct link to the specific location"),
  }).optional(),
})

export const showItamLocation = pikkuSessionlessFunc({
  description: "Returns the location with the specified id.\n\n#### Allowed For\n\n* Agents",
  input: ShowItamLocationInput,
  output: ShowItamLocationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/it_asset_management/locations/{location_id}", data) as any
  },
})
