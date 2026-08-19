import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SetOrganizationAsDefaultInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const SetOrganizationAsDefaultOutput = z.object({
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

export const setOrganizationAsDefault = pikkuSessionlessFunc({
  description: "Sets the default organization membership of a given user.\n\n#### Allowed For\n\n* Agents",
  input: SetOrganizationAsDefaultInput,
  output: SetOrganizationAsDefaultOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("PUT", "/api/v2/users/{user_id}/organizations/{organization_id}/make_default", data) as any
  },
})
