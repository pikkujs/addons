import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowItamStatusInput = z.object({
  status_id: z.string().describe("The id of the asset status. Example: \"01K9BT5XE82QS5DG58F4J8WQWY\""),
})

export const ShowItamStatusOutput = z.object({
  status: z.object({
    created_at: z.string().datetime().optional().describe("The time the status record was added"),
    external_id: z.string().nullable().optional().describe("An id you can use to connect a status to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    name: z.string().optional().describe("Display name for the status"),
    updated_at: z.string().datetime().optional().describe("The time of the status's last update"),
    url: z.string().optional().describe("Direct link to the specific status"),
  }).optional(),
})

export const showItamStatus = pikkuSessionlessFunc({
  description: "Returns the status with the specified id.\n\n#### Allowed For\n\n* Agents",
  input: ShowItamStatusInput,
  output: ShowItamStatusOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/it_asset_management/statuses/{status_id}", data) as any
  },
})
