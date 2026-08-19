import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ShowOrganizationSubscriptionInput = z.object({
  organization_subscription_id: z.number().int().describe("The ID of the organization subscription. Example: 35436"),
})

export const ShowOrganizationSubscriptionOutput = z.object({
  organization_subscription: z.object({
    created_at: z.string().datetime().optional().describe("The date the organization subscription was created"),
    id: z.number().int().optional().describe("The ID of the organization subscription"),
    organization_id: z.number().int().optional().describe("The ID of the organization"),
    user_id: z.number().int().optional().describe("The ID of the user"),
  }).optional(),
})

export const showOrganizationSubscription = pikkuSessionlessFunc({
  description: "#### Allowed For:\n\n* Agents\n* End users\n\nFor end users, the response will only list the subscriptions created by the requesting end user.",
  input: ShowOrganizationSubscriptionInput,
  output: ShowOrganizationSubscriptionOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/organization_subscriptions/{organization_subscription_id}", data) as any
  },
})
