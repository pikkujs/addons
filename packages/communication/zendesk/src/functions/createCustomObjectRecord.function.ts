import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateCustomObjectRecordInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
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

export const CreateCustomObjectRecordOutput = z.object({
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

export const createCustomObjectRecord = pikkuSessionlessFunc({
  description: "Creates a custom object record according to all the properties described by a custom object definition. If `autoincrement_enabled` is true, record names aren't allowed in the request body because they are generated automatically. If `is_unique` is true, record names must be unique.\n\nIf the custom object has a parent relationship field, the parent field is required and must reference a valid parent record. Set the value in `custom_object_fields` using the parent record's id, external id (`\"external_id:value\"`), or name (`\"name:value\"`).\n#### Allowed For\n* Agents",
  input: CreateCustomObjectRecordInput,
  output: CreateCustomObjectRecordOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/custom_objects/{custom_object_key}/records", data) as any
  },
})
