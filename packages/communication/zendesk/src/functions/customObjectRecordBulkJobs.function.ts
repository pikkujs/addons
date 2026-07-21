import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CustomObjectRecordBulkJobsInput = z.object({
  custom_object_key: z.string().describe("The key of a custom object. Example: \"car\""),
  job: z.object({
  action: z.string().optional(),
  items: z.array(z.union([z.object({
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
  }), z.string()])).optional().describe("An array of record objects for job actions that create, update, or set. An array of strings for job actions that delete."),
}).optional(),
})

export const CustomObjectRecordBulkJobsOutput = z.object({
  job_status: z.object({
    id: z.string().optional(),
    message: z.string().nullable().optional(),
    progress: z.number().int().nullable().optional(),
    results: z.array(z.object({
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
    })).nullable().optional(),
    status: z.string().optional(),
    total: z.number().int().optional(),
    url: z.string().optional(),
  }).optional(),
})

export const customObjectRecordBulkJobs = pikkuSessionlessFunc({
  description: "Queues a background job to perform bulk actions on up to 100 custom object records per single request.\nTakes a `job` object with two nested fields:\n* `action`, one of:\n    * `\"create\"`\n    * `\"delete\"`\n    * `\"delete_by_external_id\"`\n    * `\"create_or_update_by_external_id\"`\n    * `\"create_or_update_by_name\"`\n    * `\"update\"`\n* `items`\n    * For a `\"create\"` action, an array of JSON objects representing the custom object records being created\n    * For a `\"delete\"` action, an array of strings representing Zendesk record ids\n    * For a `\"delete_by_external_id\"` action, an array of strings representing external ids\n    * For a `\"create_or_update_by_external_id\"` action, an array of JSON objects representing the custom object records being created or updated by external id\n    * For a `\"create_or_update_by_name\"` action, an array of JSON objects representing the custom object records being created or updated by name. The `is_unique` property on the custom object's name field must be enabled.\n    * For an `\"update\"` action, an array of JSON objects representing the custom object records being updated\n\nNote: If autonumbering is selected for the custom object's name field, record names aren't allowed in the request body because they are generated automatically. If uniqueness is enabled, the record names must be unique.\n\n#### Allowed For\n* Agents\n\n#### Response ###\nThis endpoint returns a `job_status` [JSON object](/api-reference/ticketing/ticket-management/job_statuses/#json-format) and queues a background job to do the work. Use the [Show Job Status](/api-reference/ticketing/ticket-management/job_statuses/#show-job-status) endpoint to check for the job's completion. Only a certain number of jobs can be queued or running at the same time. See [Job limit](/api-reference/introduction/rate-limits/#job-limit) for more information.",
  input: CustomObjectRecordBulkJobsInput,
  output: CustomObjectRecordBulkJobsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/custom_objects/{custom_object_key}/jobs", data) as any
  },
})
