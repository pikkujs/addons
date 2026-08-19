import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ItamAssetBulkJobsInput = z.object({
  job: z.object({
  action: z.enum(["create", "update", "delete", "delete_by_external_id"]).optional(),
  items: z.array(z.union([z.object({
    asset_tag: z.string().nullable().optional().describe("The tag for the asset"),
    asset_type_id: z.string().describe("Id of the asset type"),
    created_at: z.string().datetime().optional().describe("The time the asset record was added"),
    custom_field_values: z.record(z.string(), z.unknown()).optional().describe("User-defined custom asset fields and values"),
    external_id: z.string().nullable().optional().describe("An id you can use to link an asset to external data"),
    id: z.string().optional().describe("Automatically assigned upon creation"),
    location_id: z.string().nullable().optional().describe("Id of the asset location"),
    manufacturer: z.string().nullable().optional().describe("The asset's manufacturer name"),
    model: z.string().nullable().optional().describe("The asset's model name"),
    name: z.string().describe("Display name for the asset"),
    notes: z.string().nullable().optional().describe("The asset's notes"),
    organization_id: z.number().int().nullable().optional().describe("Id of the organization the asset is associated with"),
    purchase_cost: z.number().nullable().optional().describe("The asset's purchase cost"),
    purchase_date: z.string().date().nullable().optional().describe("The asset's purchase date"),
    serial_number: z.string().nullable().optional().describe("The asset's serial number"),
    status_id: z.string().describe("Id of current status of the asset"),
    updated_at: z.string().datetime().optional().describe("The time of the asset's last update"),
    url: z.string().optional().describe("Direct link to the specific asset"),
    user_id: z.number().int().nullable().optional().describe("Id of the user the asset is assigned to"),
    vendor: z.string().nullable().optional().describe("The asset's vendor name"),
    warranty_expiration: z.string().date().nullable().optional().describe("The asset's warranty expiration date"),
  }), z.string()])).optional().describe("An array of asset objects for job actions that create or update. An array of strings for job actions that delete."),
}).optional(),
})

export const ItamAssetBulkJobsOutput = z.object({
  job_status: z.object({
    id: z.string().optional(),
    message: z.string().nullable().optional(),
    progress: z.number().int().nullable().optional(),
    results: z.array(z.object({
      asset_tag: z.string().nullable().optional().describe("The tag for the asset"),
      asset_type_id: z.string().describe("Id of the asset type"),
      created_at: z.string().datetime().optional().describe("The time the asset record was added"),
      custom_field_values: z.record(z.string(), z.unknown()).optional().describe("User-defined custom asset fields and values"),
      external_id: z.string().nullable().optional().describe("An id you can use to link an asset to external data"),
      id: z.string().optional().describe("Automatically assigned upon creation"),
      location_id: z.string().nullable().optional().describe("Id of the asset location"),
      manufacturer: z.string().nullable().optional().describe("The asset's manufacturer name"),
      model: z.string().nullable().optional().describe("The asset's model name"),
      name: z.string().describe("Display name for the asset"),
      notes: z.string().nullable().optional().describe("The asset's notes"),
      organization_id: z.number().int().nullable().optional().describe("Id of the organization the asset is associated with"),
      purchase_cost: z.number().nullable().optional().describe("The asset's purchase cost"),
      purchase_date: z.string().date().nullable().optional().describe("The asset's purchase date"),
      serial_number: z.string().nullable().optional().describe("The asset's serial number"),
      status_id: z.string().describe("Id of current status of the asset"),
      updated_at: z.string().datetime().optional().describe("The time of the asset's last update"),
      url: z.string().optional().describe("Direct link to the specific asset"),
      user_id: z.number().int().nullable().optional().describe("Id of the user the asset is assigned to"),
      vendor: z.string().nullable().optional().describe("The asset's vendor name"),
      warranty_expiration: z.string().date().nullable().optional().describe("The asset's warranty expiration date"),
    })).nullable().optional(),
    status: z.string().optional(),
    total: z.number().int().optional(),
    url: z.string().optional(),
  }).optional(),
})

export const itamAssetBulkJobs = pikkuSessionlessFunc({
  description: "Queues a background job to perform bulk actions on up to 100 asset records per request.\nTakes a `job` object with two nested fields:\n* `action`, one of:\n    * `\"create\"`\n    * `\"update\"`\n    * `\"delete\"`\n    * `\"delete_by_external_id\"`\n* `items`\n    * For a `\"create\"` action, an array of JSON objects representing the assets being created\n    * For an `\"update\"` action, an array of JSON objects representing the assets being updated (must include `id` attribute)\n    * For a `\"delete\"` action, an array of strings representing Zendesk asset ids\n    * For a `\"delete_by_external_id\"` action, an array of strings representing external ids\n\nNote: For create and update actions, the `asset_type_id`, `status_id`, and `location_id` fields can be specified using either the ID or the name of the resource. For example, you can use `\"asset_type_id\": \"01K9BW852KHGF59W0TM02J2F6H\"` or `\"asset_type\": \"Laptop\"`.\n\n#### Allowed For\n* Admins\n\n#### Response\nThis endpoint returns a `job_status` [JSON object](/api-reference/ticketing/ticket-management/job_statuses/#json-format) and queues a background job to do the work. Use the [Show Job Status](/api-reference/ticketing/ticket-management/job_statuses/#show-job-status) endpoint to check for the job's completion. Only a certain number of jobs can be queued or running at the same time. See [Job limit](/api-reference/introduction/rate-limits/#job-limit) for more information.",
  input: ItamAssetBulkJobsInput,
  output: ItamAssetBulkJobsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/it_asset_management/assets/jobs", data) as any
  },
})
