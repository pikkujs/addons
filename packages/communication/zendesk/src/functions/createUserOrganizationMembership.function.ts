import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CreateUserOrganizationMembershipInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const CreateUserOrganizationMembershipOutput = z.object({
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

export const createUserOrganizationMembership = pikkuSessionlessFunc({
  description: "Assigns a user to a given organization. Returns an error with status 422 if the user is already assigned to the organization.\n\n#### Allowed For\n\n* Admins\n* Agents when creating a new organization membership for an end user",
  input: CreateUserOrganizationMembershipInput,
  output: CreateUserOrganizationMembershipOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/users/{user_id}/organization_memberships", data) as any
  },
})
