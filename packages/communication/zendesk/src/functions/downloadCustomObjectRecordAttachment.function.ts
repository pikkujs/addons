import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'

export const DownloadCustomObjectRecordAttachmentInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  record_id: z.string().describe("The id of a custom object record. Example: \"01GCSJW391QVSC80GYDH7E93Q6\""),
  id: z.string().describe("The id of a custom object record attachment. Example: \"01HQ2Z3X4Y5T6R7S8P9Q0W1E2\""),
  inline: z.boolean().optional().default(false).describe("If true, the attachment content is displayed inline in the browser. If false or omitted, the attachment is downloaded as a file.\n"),
})

export const DownloadCustomObjectRecordAttachmentOutput = z.string()

export const downloadCustomObjectRecordAttachment = pikkuSessionlessFunc({
  description: "Downloads the specified attachment content. Returns a redirect to the attachment's content URL.\nAccess to malicious attachments is controlled by the `malware_access_override` setting.\n\n#### Allowed For\n* Agents",
  input: DownloadCustomObjectRecordAttachmentInput,
  output: DownloadCustomObjectRecordAttachmentOutput,
  errors: [BadRequestError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/records/{record_id}/attachments/{id}/download", data) as any
  },
})
