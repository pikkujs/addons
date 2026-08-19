import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowOrganizationMembershipByUserIdInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  organization_membership_id: z.number().int().describe("The ID of the organization membership. Example: 4"),
})

export const ShowOrganizationMembershipByUserIdOutput = z.object({
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

export const showOrganizationMembershipByUserId = pikkuSessionlessFunc({
  description: "#### Allowed for\n\n* Agents",
  input: ShowOrganizationMembershipByUserIdInput,
  output: ShowOrganizationMembershipByUserIdOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/organization_memberships/{organization_membership_id}", data) as any
  },
})
