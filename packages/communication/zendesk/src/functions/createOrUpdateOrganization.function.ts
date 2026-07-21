import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateOrUpdateOrganizationOutput = z.object({
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

export const createOrUpdateOrganization = pikkuSessionlessFunc({
  description: "Creates an organization if it doesn't already exist, or updates\nan existing organization. Using this method means one less call\nto check if an organization exists before creating it. You need\nto specify the id or external id when updating\nan organization to avoid a duplicate error response. Name is\nnot available as a matching criteria.\n\n#### Allowed For\n\n* Agents, with restrictions on certain actions",
  output: CreateOrUpdateOrganizationOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("POST", "/api/v2/organizations/create_or_update") as any
  },
})
