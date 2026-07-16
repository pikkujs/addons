import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowUserBrandAgentByIdInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  brand_agent_id: z.string().describe("The id of the brand agent. Example: \"123ABC\""),
})

export const ShowUserBrandAgentByIdOutput = z.object({
  brand_agent: z.object({
    brand_id: z.number().int().describe("The id of a brand"),
    created_at: z.string().datetime().optional().describe("The time the brand membership was created"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the brand membership"),
    url: z.string().optional().describe("The API url of this record"),
    user_id: z.number().int().describe("The id of an agent"),
  }).optional(),
})

export const showUserBrandAgentById = pikkuSessionlessFunc({
  description: "Returns a specific brand agent membership for a user.\n\n#### Allowed For\n\n* Admins",
  input: ShowUserBrandAgentByIdInput,
  output: ShowUserBrandAgentByIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/brand_agents/{brand_agent_id}", data) as any
  },
})
