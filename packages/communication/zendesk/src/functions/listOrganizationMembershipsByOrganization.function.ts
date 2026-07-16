import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListOrganizationMembershipsByOrganizationInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const ListOrganizationMembershipsByOrganizationOutput = z.object({
  organization_memberships: z.array(z.object({
    created_at: z.string().datetime().optional().describe("When this record was created"),
    default: z.boolean().nullable().describe("Denotes whether this is the default organization membership for the user. If false, returns `null`"),
    id: z.number().int().optional().describe("Automatically assigned when the membership is created"),
    organization_id: z.number().int().describe("The ID of the organization associated with this user, in this membership"),
    organization_name: z.string().optional().describe("The name of the organization associated with this user, in this membership"),
    updated_at: z.string().datetime().optional().describe("When this record last got updated"),
    url: z.string().optional().describe("The API url of this membership"),
    user_id: z.number().int().describe("The ID of the user for whom this membership belongs"),
    view_tickets: z.boolean().optional().describe("Denotes whether the user can or cannot have access to all organization's tickets."),
  })).optional(),
})

export const listOrganizationMembershipsByOrganization = pikkuSessionlessFunc({
  description: "Returns a list of organization memberships for the account, user or organization in question.\n\n**Note**: When returning organization memberships for a user, organization memberships are sorted with the default organization first, and then by organization name.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For\n\n- Agents\n- End users",
  input: ListOrganizationMembershipsByOrganizationInput,
  output: ListOrganizationMembershipsByOrganizationOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/{organization_id}/organization_memberships", data) as any
  },
})
