import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListItamAssetsInput = z.object({
  "filter[ids]": z.string().optional().describe("Optional comma-separated list of ids to filter assets by. If one or more ids are specified, only matching assets are returned. The ids must be unique and are case sensitive."),
  "filter[external_ids]": z.string().optional().describe("Optional comma-separated list of external ids to filter assets by. If one or more external ids are specified, only matching assets are returned. The external ids must be unique and are case sensitive."),
})

export const ListItamAssetsOutput = z.object({
  assets: z.array(z.object({
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
  })).optional(),
  links: z.object({
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }).optional(),
  meta: z.object({
    after_cursor: z.string().nullable(),
    before_cursor: z.string().nullable(),
    has_more: z.boolean(),
  }).optional(),
})

export const listItamAssets = pikkuSessionlessFunc({
  description: "Lists all assets for all asset types.\n\n#### Filtering\n\nUse the `filter[ids]` or `filter[external_ids]` query parameters to filter results by asset IDs or external IDs. Both parameters accept comma-separated values.\n\n#### Pagination\n\n* [Cursor pagination](/api-reference/introduction/pagination/#cursor-pagination) only.\n\n#### Allowed For\n\n* Agents",
  input: ListItamAssetsInput,
  output: ListItamAssetsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/it_asset_management/assets", data) as any
  },
})
