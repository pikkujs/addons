import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowUserRelatedInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const ShowUserRelatedOutput = z.object({
  user_related: z.object({
    assigned_tickets: z.number().int().optional().describe("Count of assigned tickets"),
    ccd_tickets: z.number().int().optional().describe("Count of collaborated tickets"),
    organization_subscriptions: z.number().int().optional().describe("Count of organization subscriptions"),
    requested_tickets: z.number().int().optional().describe("Count of requested tickets"),
  }).optional(),
})

export const showUserRelated = pikkuSessionlessFunc({
  input: ShowUserRelatedInput,
  output: ShowUserRelatedOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/related", data) as any
  },
})
