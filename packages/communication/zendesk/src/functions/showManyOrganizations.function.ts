import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ShowManyOrganizationsInput = z.object({
  ids: z.string().optional().describe("A list of organization ids. Example: \"35436,20057623\""),
  external_ids: z.string().optional().describe("A list of external ids. Example: \"1764,42156\""),
})

export const ShowManyOrganizationsOutput = z.object({
  count: z.number().int().optional(),
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
  previous_page: z.string().nullable().optional(),
})

export const showManyOrganizations = pikkuSessionlessFunc({
  description: "Accepts a comma-separated list of up to 100 organization ids or external ids.\n\n#### Allowed For\n\n* Admins\n* Agents",
  input: ShowManyOrganizationsInput,
  output: ShowManyOrganizationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/show_many", data) as any
  },
})
