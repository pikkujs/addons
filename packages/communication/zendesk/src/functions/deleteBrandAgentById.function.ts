import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteBrandAgentByIdInput = z.object({
  brand_agent_id: z.string().describe("The id of the brand agent. Example: \"123ABC\""),
})

export const deleteBrandAgentById = pikkuSessionlessFunc({
  description: "Deletes a brand agent membership.\n\n\n#### Allowed For\n\n* Admins",
  input: DeleteBrandAgentByIdInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/brand_agents/{brand_agent_id}", data)
  },
})
