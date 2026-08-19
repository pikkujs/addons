import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const IncrementalOrganizationExportInput = z.object({
  start_time: z.number().int().describe("The time to start the incremental export from. Must be at least one minute in the past. Data isn't provided for the most recent minute. Example: 1332034771"),
  per_page: z.number().int().optional().describe("The number of records to return per page"),
})

export const IncrementalOrganizationExportOutput = z.object({
  count: z.number().int().optional(),
  end_of_stream: z.boolean().optional(),
  end_time: z.number().int().optional(),
  next_page: z.string().nullable().optional(),
  organizations: z.array(z.object({
    created_at: z.string().optional().describe("The time the organization was created"),
    details: z.string().nullable().optional().describe("Any details obout the organization, such as the address"),
    domain_names: z.array(z.string()).optional().describe("An array of domain names associated with this organization"),
    external_id: z.string().nullable().optional().describe("A unique external id to associate organizations to an external record. The id is case-insensitive. For example, \"company1\" and \"Company1\" are considered the same"),
    group_id: z.number().int().nullable().optional().describe("New tickets from users in this organization are automatically put in this group"),
    id: z.number().int().optional().describe("Automatically assigned when the organization is created"),
    name: z.string().describe("A unique name for the organization"),
    notes: z.string().nullable().optional().describe("Any notes you have about the organization"),
    organization_fields: z.record(z.string(), z.union([z.string(), z.number()])).nullable().optional().describe("Custom fields for this organization. See [Custom organization fields](/api-reference/ticketing/organizations/organizations/#custom-organization-fields)"),
    shared_comments: z.boolean().optional().describe("End users in this organization are able to comment on each other's tickets"),
    shared_tickets: z.boolean().optional().describe("End users in this organization are able to see each other's tickets"),
    tags: z.array(z.string()).optional().describe("The tags of the organization"),
    updated_at: z.string().optional().describe("The time of the last update of the organization"),
    url: z.string().optional().describe("The API url of this organization"),
  })).optional(),
})

export const incrementalOrganizationExport = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n * Admins\n\n#### Sideloading\n\nSee [Organizations sideloads](/documentation/ticketing/using-the-zendesk-api/side_loading/#supported-endpoints).",
  input: IncrementalOrganizationExportInput,
  output: IncrementalOrganizationExportOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/incremental/organizations", data) as any
  },
})
