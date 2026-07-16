import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteManyObjectTriggersInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  ids: z.string().describe("A comma separated list of trigger IDs. Example: \"131,178,938\""),
})

export const deleteManyObjectTriggers = pikkuSessionlessFunc({
  description: "Deletes the object triggers corresponding to the provided comma-separated list of ids. \n\n**Note**: You can only bulk-delete triggers associated with one object at a time, specified by the `custom_object_key` in the request.\n\n#### Allowed For\n\n* Administrators\n* Agents in custom roles with the `manage_triggers` permission (Enterprise only)\n\n#### Request Parameters\n\nThe DELETE request takes an `ids` object that lists the\nobject triggers to delete. All of the specified object trigger `ids` must be associated with a single object.\n\n| Name | Description\n| ---- | -----------\n| ids  | The ids of the triggers to delete\n\n#### Example request\n\n```js\n{\n  \"ids\": \"25,23,27,22\"\n}\n```",
  input: DeleteManyObjectTriggersInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_objects/{custom_object_key}/triggers/destroy_many", data)
  },
})
