import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowOrganizationInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
  include: z.string().optional().describe("Include additional related data. Supported values: `lookup_relationship_fields`.\n"),
  include_boundary_indicators: z.boolean().optional().describe("When true, includes `has_more` indicator in the cursor pagination response meta.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
  include_item_cursors: z.boolean().optional().describe("When true, includes cursor values for each item in the cursor pagination response.\n\nOnly valid with cursor pagination (page[size], page[after], page[before]).\n"),
})

export const ShowOrganizationOutput = z.object({
  organization: z.object({
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
  }).optional(),
})

export const showOrganization = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n* Agents",
  input: ShowOrganizationInput,
  output: ShowOrganizationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/{organization_id}", data) as any
  },
})
