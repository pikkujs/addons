import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowCustomObjectRecordInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  custom_object_record_id: z.string().describe("The id of a custom object record. Example: \"01GCSJW391QVSC80GYDH7E93Q6\""),
})

export const ShowCustomObjectRecordOutput = z.object({
  custom_object_record: z.object({
    created_at: z.string().datetime().optional().describe("The time the object was created"),
    created_by_user_id: z.string().optional().describe("Id of a user who created the object"),
    custom_object_fields: z.record(z.string(), z.unknown()).optional(),
    custom_object_key: z.string().optional().describe("A user-defined unique identifier"),
    external_id: z.string().nullable().optional().describe("An id you can use to link custom object records to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    name: z.string().describe("User-defined display name for the object. If autonumbering is selected for the custom object's name field, the name isn't allowed because it's automatically generated. If uniqueness is enabled, the name must be unique."),
    photo: z.record(z.string(), z.unknown()).nullable().optional().describe("The record photo represented as an [Attachment](/api-reference/ticketing/tickets/ticket-attachments/). The `allows_photos` property must be set to true for the object. Record photos are publicly accessible via the photo `content_url`."),
    updated_at: z.string().datetime().optional().describe("The time of the last update of the object"),
    updated_by_user_id: z.string().optional().describe("Id of the last user who updated the object"),
    url: z.string().optional().describe("Direct link to the specific custom object"),
  }).optional(),
})

export const showCustomObjectRecord = pikkuSessionlessFunc({
  description: "Returns a custom record for a specific object using a provided id.\n#### Allowed For\n* Agents",
  input: ShowCustomObjectRecordInput,
  output: ShowCustomObjectRecordOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/custom_objects/{custom_object_key}/records/{custom_object_record_id}", data) as any
  },
})
