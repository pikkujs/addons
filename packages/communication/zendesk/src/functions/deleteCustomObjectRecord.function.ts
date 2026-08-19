import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteCustomObjectRecordInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  custom_object_record_id: z.string().describe("The id of a custom object record. Example: \"01GCSJW391QVSC80GYDH7E93Q6\""),
})

export const deleteCustomObjectRecord = pikkuSessionlessFunc({
  description: "Deletes a record with the specified id.\n\nIf the record is a parent in a parent-child relationship, all associated child records are also deleted asynchronously via a background job. Child records are soft-deleted first and then permanently deleted after a 30-day retention period. The delete request returns immediately; the cascade deletion happens in the background.\n\n#### Allowed For\n* Agents",
  input: DeleteCustomObjectRecordInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_objects/{custom_object_key}/records/{custom_object_record_id}", data)
  },
})
