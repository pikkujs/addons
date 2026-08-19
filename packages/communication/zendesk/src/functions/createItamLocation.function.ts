import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateItamLocationInput = z.object({
  location: z.object({
  created_at: z.string().datetime().optional().describe("The time the location record was added"),
  external_id: z.string().nullable().optional().describe("An id you can use to connect a location to external data"),
  id: z.string().optional().describe("Automatically assigned upon creation"),
  name: z.string().describe("Display name for the location"),
  updated_at: z.string().datetime().optional().describe("The time of the location's last update"),
  url: z.string().optional().describe("Direct link to the specific location"),
}).optional(),
})

export const CreateItamLocationOutput = z.object({
  location: z.object({
    created_at: z.string().datetime().optional().describe("The time the location record was added"),
    external_id: z.string().nullable().optional().describe("An id you can use to connect a location to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    name: z.string().describe("Display name for the location"),
    updated_at: z.string().datetime().optional().describe("The time of the location's last update"),
    url: z.string().optional().describe("Direct link to the specific location"),
  }).optional(),
})

export const createItamLocation = pikkuSessionlessFunc({
  description: "Creates a location.\n\n#### Allowed For\n\n* Admins",
  input: CreateItamLocationInput,
  output: CreateItamLocationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/it_asset_management/locations", data) as any
  },
})
