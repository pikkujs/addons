import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteTriggerInput = z.object({
  trigger_id: z.number().int().describe("The ID of the trigger. Example: 198"),
})

export const deleteTrigger = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: DeleteTriggerInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/triggers/{trigger_id}", data)
  },
})
