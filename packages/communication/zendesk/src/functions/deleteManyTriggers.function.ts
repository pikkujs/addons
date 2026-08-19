import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteManyTriggersInput = z.object({
  ids: z.string().describe("A comma separated list of trigger IDs. Example: \"131,178,938\""),
})

export const deleteManyTriggers = pikkuSessionlessFunc({
  description: "Deletes the ticket triggers corresponding to the provided comma-separated list of IDs.\n\n#### Allowed For\n\n* Agents\n\n#### Request Parameters\n\nThe DELETE request takes one parameter, an `ids` object that lists the\nticket triggers to delete.\n\n| Name | Description\n| ---- | -----------\n| ids  | The IDs of the triggers to delete\n\n#### Example request\n\n```js\n{\n  \"ids\": \"25,23,27,22\"\n}\n```",
  input: DeleteManyTriggersInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/triggers/destroy_many", data)
  },
})
