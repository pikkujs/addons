import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const UpsertCustomObjectRecordByExternalIdOrNameInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  external_id: z.string().optional().describe("The external id of a custom object record. Example: \"X90001\""),
  name: z.string().optional().describe("The name of a custom object record. Example: \"boat\""),
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

export const UpsertCustomObjectRecordByExternalIdOrNameOutput = z.object({
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

export const upsertCustomObjectRecordByExternalIdOrName = pikkuSessionlessFunc({
  description: "Creates or updates a custom object record based on the provided external id or name. If a record exists for the given external id or name, updates it. Only the specified attributes are updated. Otherwise, creates a new record with the provided external id, name and other attributes. The `is_unique` property on the custom object's name field must be enabled in order to update or create by name. External id and name cannot be used together in the same request.\n#### Allowed For\n* Agents",
  input: UpsertCustomObjectRecordByExternalIdOrNameInput,
  output: UpsertCustomObjectRecordByExternalIdOrNameOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PATCH", "/api/v2/custom_objects/{custom_object_key}/records", data) as any
  },
})
