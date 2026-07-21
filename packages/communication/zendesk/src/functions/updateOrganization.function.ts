import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { TooManyRequestsError } from '@pikku/core/errors'

export const UpdateOrganizationInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const UpdateOrganizationOutput = z.object({
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

export const updateOrganization = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Admins\n* Agents\n\nAgents with no permissions restrictions can only update \"notes\" on organizations.\n\n**Note:** Updating an organization's `domain_names` property overwrites all existing `domain_names` values. To prevent this, submit a complete list of `domain_names` for the organization in your request.\n\n#### Example Request\n\n```js\n{\n  \"organization\": {\n    \"notes\": \"Something interesting\"\n  }\n}\n```",
  input: UpdateOrganizationInput,
  output: UpdateOrganizationOutput,
  errors: [TooManyRequestsError],
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/organizations/{organization_id}", data) as any
  },
})
