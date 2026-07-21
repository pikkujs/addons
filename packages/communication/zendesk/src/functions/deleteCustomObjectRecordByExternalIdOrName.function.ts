import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteCustomObjectRecordByExternalIdOrNameInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  external_id: z.string().optional().describe("The external id of a custom object record. Example: \"X90001\""),
  name: z.string().optional().describe("The name of a custom object record. Example: \"boat\""),
})

export const deleteCustomObjectRecordByExternalIdOrName = pikkuSessionlessFunc({
  description: "Deletes a record with the specified external id or name. The `is_unique` property on the custom object's name field must be enabled in order to delete by name. External id and name cannot be used together in the same request.\n\nIf the record is a parent in a parent-child relationship, all associated child records are also deleted asynchronously via a background job.\n#### Allowed For\n* Agents",
  input: DeleteCustomObjectRecordByExternalIdOrNameInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_objects/{custom_object_key}/records", data)
  },
})
