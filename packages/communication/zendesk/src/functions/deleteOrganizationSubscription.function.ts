import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const DeleteOrganizationSubscriptionInput = z.object({
  organization_subscription_id: z.number().int().describe("The ID of the organization subscription. Example: 35436"),
})

export const deleteOrganizationSubscription = pikkuSessionlessFunc({
  description: "#### Allowed For:\n\n* Agents\n* End users",
  input: DeleteOrganizationSubscriptionInput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("DELETE", "/api/v2/organization_subscriptions/{organization_subscription_id}", data)
  },
})
