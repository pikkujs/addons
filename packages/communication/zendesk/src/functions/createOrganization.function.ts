import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateOrganizationInput = z.object({
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
}),
})

export const CreateOrganizationOutput = z.object({
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

export const createOrganization = pikkuSessionlessFunc({
  description: "You must provide a unique `name` for each organization. Normally\nthe system doesn't allow records to be created with identical names.\nHowever, a race condition can occur if you make two or more identical\nPOSTs very close to each other, causing the records to have identical\norganization names.\n\n**Note**: Leading and trailing whitespace in `name` is automatically trimmed before validation. This means that names differing only by whitespace are treated as duplicates. For example, \"API Company\" and \"API Company \" are considered the same name.\n\n#### Allowed For\n\n* Admins\n* Agents assigned to a custom role with permissions to manage organizations (Enterprise only)",
  input: CreateOrganizationInput,
  output: CreateOrganizationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/organizations", data) as any
  },
})
