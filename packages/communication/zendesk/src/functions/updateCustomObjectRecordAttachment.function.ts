import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError } from '@pikku/core/errors'

export const UpdateCustomObjectRecordAttachmentInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  record_id: z.string().describe("The id of a custom object record. Example: \"01GCSJW391QVSC80GYDH7E93Q6\""),
  id: z.string().describe("The id of a custom object record attachment. Example: \"01HQ2Z3X4Y5T6R7S8P9Q0W1E2\""),
  custom_object_record_attachment: z.object({
  malware_access_override: z.boolean().describe("If true, allows access to an attachment flagged as malware. If false, blocks access to such an attachment."),
}),
})

export const UpdateCustomObjectRecordAttachmentOutput = z.object({
  custom_object_record_attachment: z.object({
    content_type: z.string().optional().describe("The content type of the file"),
    content_url: z.string().optional().describe("A full URL where the attachment file can be downloaded. The file may be hosted externally so take care not to inadvertently send Zendesk authentication credentials."),
    created_at: z.string().datetime().optional().describe("The date and time when the attachment was created"),
    created_by: z.string().optional().describe("The name of the user who created the attachment"),
    custom_object_record_id: z.string().optional().describe("The ID of the custom object record this attachment belongs to"),
    filename: z.string().optional().describe("The name of the attachment file"),
    id: z.string().optional().describe("Automatically assigned when created"),
    malware_access_override: z.boolean().optional().describe("If true, you can download an attachment flagged as malware. If false, you can't download such an attachment."),
    malware_scan_completed_at: z.string().datetime().nullable().optional().describe("The date and time when the malware scan was completed"),
    malware_scan_status: z.enum(["malware_found", "malware_not_found", "failed_to_scan", "not_scanned"]).optional().describe("The result of the malware scan. There is a delay between the time the attachment is uploaded and when the malware scan is completed."),
    size: z.number().int().optional().describe("The size of the file in bytes"),
  }).optional().describe("A file attachment associated with a custom object record"),
})

export const updateCustomObjectRecordAttachment = pikkuSessionlessFunc({
  description: "Updates malware access settings for the specified attachment. This is typically used to allow access to attachments that were flagged as containing malware.\n\n#### Allowed For\n* Admins",
  input: UpdateCustomObjectRecordAttachmentInput,
  output: UpdateCustomObjectRecordAttachmentOutput,
  errors: [BadRequestError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/custom_objects/{custom_object_key}/records/{record_id}/attachments/{id}", data) as any
  },
})
