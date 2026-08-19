import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowOrganizationMembershipByIdInput = z.object({
  organization_membership_id: z.number().int().describe("The ID of the organization membership. Example: 4"),
})

export const ShowOrganizationMembershipByIdOutput = z.object({
  organization_membership: z.object({
    created_at: z.string().datetime().optional().describe("When this record was created"),
    default: z.boolean().nullable().describe("Denotes whether this is the default organization membership for the user. If false, returns `null`"),
    id: z.number().int().optional().describe("Automatically assigned when the membership is created"),
    organization_id: z.number().int().describe("The ID of the organization associated with this user, in this membership"),
    organization_name: z.string().optional().describe("The name of the organization associated with this user, in this membership"),
    updated_at: z.string().datetime().optional().describe("When this record last got updated"),
    url: z.string().optional().describe("The API url of this membership"),
    user_id: z.number().int().describe("The ID of the user for whom this membership belongs"),
    view_tickets: z.boolean().optional().describe("Denotes whether the user can or cannot have access to all organization's tickets."),
  }).optional(),
})

export const showOrganizationMembershipById = pikkuSessionlessFunc({
  description: "#### Allowed for\n\n* Agents",
  input: ShowOrganizationMembershipByIdInput,
  output: ShowOrganizationMembershipByIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organization_memberships/{organization_membership_id}", data) as any
  },
})
