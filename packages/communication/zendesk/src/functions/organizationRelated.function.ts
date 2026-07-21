import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const OrganizationRelatedInput = z.object({
  organization_id: z.number().int().describe("The ID of an organization. Example: 16"),
})

export const OrganizationRelatedOutput = z.object({
  organization_related: z.object({
    tickets_count: z.number().int().optional().describe("The number of tickets for the organization"),
    users_count: z.number().int().optional().describe("The number of users for the organization"),
  }).optional(),
})

export const organizationRelated = pikkuSessionlessFunc({
  description: "#### Allowed For\n\n* Agents",
  input: OrganizationRelatedInput,
  output: OrganizationRelatedOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organizations/{organization_id}/related", data) as any
  },
})
