import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowItamAssetInput = z.object({
  asset_id: z.string().describe("The id of the asset. Example: \"01K9AMAPSER316NHTJ2R36YAQ1\""),
})

export const ShowItamAssetOutput = z.object({
  asset: z.object({
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
  }).optional(),
})

export const showItamAsset = pikkuSessionlessFunc({
  description: "Returns the asset with the specified id.\n\n#### Allowed For\n\n* Agents",
  input: ShowItamAssetInput,
  output: ShowItamAssetOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/it_asset_management/assets/{asset_id}", data) as any
  },
})
