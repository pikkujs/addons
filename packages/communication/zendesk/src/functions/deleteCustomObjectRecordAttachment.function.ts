import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DeleteCustomObjectRecordAttachmentInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  record_id: z.string().describe("The id of a custom object record. Example: \"01GCSJW391QVSC80GYDH7E93Q6\""),
  id: z.string().describe("The id of a custom object record attachment. Example: \"01HQ2Z3X4Y5T6R7S8P9Q0W1E2\""),
})

export const deleteCustomObjectRecordAttachment = pikkuSessionlessFunc({
  description: "Deletes the specified attachment associated with a custom object record.\n\n#### Allowed For\n* Agents",
  input: DeleteCustomObjectRecordAttachmentInput,
  errors: [BadRequestError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/custom_objects/{custom_object_key}/records/{record_id}/attachments/{id}", data)
  },
})
