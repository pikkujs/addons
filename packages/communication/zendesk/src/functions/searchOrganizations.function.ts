import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SearchOrganizationsInput = z.object({
  external_id: z.number().int().optional().describe("The external id of an organization. Example: 1234"),
  name: z.string().optional().describe("The name of an organization. Example: \"ACME Incorporated\""),
})

export const SearchOrganizationsOutput = z.object({
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

export const searchOrganizations = pikkuSessionlessFunc({
  description: "Returns an array of organizations matching the criteria. You may search by an organization's `external_id` or `name`, but not both:\n\n#### Searching by `external_id`\n\nIf you set the `external_id` value of an organization to associate it to an external record, you can use it to search for the organization.\n\nFor an organization to be returned, its `external_id` must exactly match the value provided (case insensitive).\n\n#### Searching by `name`\n\nFor an organization to be returned, its `name` must exactly match the value provided (case insensitive).\n\n#### Allowed For:\n\n* Admins\n* Agents assigned to a custom role with permissions to add or modify organizations (Enterprise only)\n\nSee [Creating custom agent roles](https://support.zendesk.com/hc/en-us/articles/4408882153882#topic_cxn_hig_bd) in Zendesk help.",
  input: SearchOrganizationsInput,
  output: SearchOrganizationsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/search", data) as any
  },
})
