import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const BulkDeleteAutomationsInput = z.object({
  ids: z.array(z.number().int()).optional().describe("The IDs of the automations to delete"),
})

export const bulkDeleteAutomations = pikkuSessionlessFunc({
  description: "Deletes the automations corresponding to the provided comma-separated list of IDs.\n\n**Note**: You might be restricted from deleting some default automations. If included in a bulk deletion, the unrestricted automations will be deleted.\n\n#### Allowed For\n\n* Agents\n\n#### Request Parameters\n\nThe DELETE request takes one parameter, an `ids` object that lists the automations to delete.\n\n| Name | Description\n| ---- | -----------\n| ids  | The IDs of the automations to delete\n\n#### Example request\n\n```js\n{\n  \"ids\": \"25,23,27,22\"\n}\n```",
  input: BulkDeleteAutomationsInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/automations/destroy_many", data)
  },
})
