import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListBrandAgentsByBrandInput = z.object({
  brand_id: z.number().int().describe("The ID of the brand. Example: 360002783572"),
})

export const ListBrandAgentsByBrandOutput = z.object({
  brand_agents: z.array(z.object({
    brand_id: z.number().int().describe("The id of a brand"),
    created_at: z.string().datetime().optional().describe("The time the brand membership was created"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the brand membership"),
    url: z.string().optional().describe("The API url of this record"),
    user_id: z.number().int().describe("The id of an agent"),
  })).optional(),
})

export const listBrandAgentsByBrand = pikkuSessionlessFunc({
  description: "Returns a list of all agents assigned to a specific brand.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For:\n\n* Admins",
  input: ListBrandAgentsByBrandInput,
  output: ListBrandAgentsByBrandOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/brands/{brand_id}/agents", data) as any
  },
})
