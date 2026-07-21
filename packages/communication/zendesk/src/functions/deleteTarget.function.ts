import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteTargetInput = z.object({
  target_id: z.number().int().describe("The ID of the target. Example: 211"),
})

export const deleteTarget = pikkuSessionlessFunc({
  description: "#### Allowed For\n* Admins",
  input: DeleteTargetInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/targets/{target_id}", data)
  },
})
