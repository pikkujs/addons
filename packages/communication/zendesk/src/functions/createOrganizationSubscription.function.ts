import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const CreateOrganizationSubscriptionInput = z.object({
  organization_subscription: z.object({
  organization_id: z.number().int().optional().describe("The ID of the organization"),
  user_id: z.number().int().optional().describe("The ID of the user"),
}).optional(),
})

export const CreateOrganizationSubscriptionOutput = z.object({
  organization_subscription: z.object({
    created_at: z.string().datetime().optional().describe("The date the organization subscription was created"),
    id: z.number().int().optional().describe("The ID of the organization subscription"),
    organization_id: z.number().int().optional().describe("The ID of the organization"),
    user_id: z.number().int().optional().describe("The ID of the user"),
  }).optional(),
})

export const createOrganizationSubscription = pikkuSessionlessFunc({
  description: "#### Allowed For:\n\n* Agents\n* End users\n\nEnd users can only subscribe to shared organizations in which they're members.",
  input: CreateOrganizationSubscriptionInput,
  output: CreateOrganizationSubscriptionOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("POST", "/api/v2/organization_subscriptions", data) as any
  },
})
