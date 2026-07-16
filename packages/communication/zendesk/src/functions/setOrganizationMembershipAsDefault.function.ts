import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SetOrganizationMembershipAsDefaultInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  organization_membership_id: z.number().int().describe("The ID of the organization membership. Example: 4"),
})

export const SetOrganizationMembershipAsDefaultOutput = z.object({
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

export const setOrganizationMembershipAsDefault = pikkuSessionlessFunc({
  description: "Sets the default organization membership of a given user.\n\n#### Allowed for\n\n* Admins\n* Agents when setting the default organization membership for an end user",
  input: SetOrganizationMembershipAsDefaultInput,
  output: SetOrganizationMembershipAsDefaultOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/users/{user_id}/organization_memberships/{organization_membership_id}/make_default", data) as any
  },
})
