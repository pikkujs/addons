import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteAutomationInput = z.object({
  automation_id: z.number().int().describe("The ID of the automation. Example: 25"),
})

export const deleteAutomation = pikkuSessionlessFunc({
  description: "**Note**: You might be restricted from deleting some default automations.\n\n#### Allowed For\n\n* Agents",
  input: DeleteAutomationInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/automations/{automation_id}", data)
  },
})
