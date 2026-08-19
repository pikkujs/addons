import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteObjectTriggerInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  trigger_id: z.number().int().describe("The ID of the trigger. Example: 198"),
})

export const deleteObjectTrigger = pikkuSessionlessFunc({
  description: "Deletes a specified object trigger.\n\n#### Allowed For\n\n* Administrators\n* Agents in custom roles with the `manage_triggers` permission (Enterprise only)",
  input: DeleteObjectTriggerInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_objects/{custom_object_key}/triggers/{trigger_id}", data)
  },
})
