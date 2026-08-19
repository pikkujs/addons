import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListItamStatusesOutput = z.object({
  statuses: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The time the status record was added"),
    external_id: z.string().nullable().optional().describe("An id you can use to connect a status to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    name: z.string().optional().describe("Display name for the status"),
    updated_at: z.string().datetime().optional().describe("The time of the status's last update"),
    url: z.string().optional().describe("Direct link to the specific status"),
  })).optional(),
})

export const listItamStatuses = pikkuSessionlessFunc({
  description: "Lists all statuses.\n\n#### Allowed For\n\n* Agents",
  output: ListItamStatusesOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/it_asset_management/statuses") as any
  },
})
