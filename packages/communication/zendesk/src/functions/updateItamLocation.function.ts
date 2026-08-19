import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpdateItamLocationInput = z.object({
  location_id: z.string().describe("The id of the location. Example: \"01KBFXPX2QFYZSSC1TMF3Q6T68\""),
})

export const UpdateItamLocationOutput = z.object({
  location: z.object({
    created_at: z.string().datetime().optional().describe("The time the location record was added"),
    external_id: z.string().nullable().optional().describe("An id you can use to connect a location to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    name: z.string().describe("Display name for the location"),
    updated_at: z.string().datetime().optional().describe("The time of the location's last update"),
    url: z.string().optional().describe("Direct link to the specific location"),
  }).optional(),
})

export const updateItamLocation = pikkuSessionlessFunc({
  description: "Updates an existing location.\n\n#### Allowed For\n\n* Admins",
  input: UpdateItamLocationInput,
  output: UpdateItamLocationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PATCH", "/api/v2/it_asset_management/locations/{location_id}", data) as any
  },
})
