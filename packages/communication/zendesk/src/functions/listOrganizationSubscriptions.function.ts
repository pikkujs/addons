import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListOrganizationSubscriptionsOutput = z.object({
  count: z.number().int().optional().describe("the total record count"),
  next_page: z.string().url().nullable().optional().describe("the URL of the next page"),
  previous_page: z.string().url().nullable().optional().describe("the URL of the previous page"),
  organization_subscriptions: z.array(z.object({
    created_at: z.string().datetime().optional().describe("The date the organization subscription was created"),
    id: z.number().int().optional().describe("The ID of the organization subscription"),
    organization_id: z.number().int().optional().describe("The ID of the organization"),
    user_id: z.number().int().optional().describe("The ID of the user"),
  })).optional().describe("An array of organization subscriptions"),
})

export const listOrganizationSubscriptions = pikkuSessionlessFunc({
  description: "#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For:\n\n* Agents\n* End users\n\nFor end users, the response will only list the subscriptions created by the requesting end user.",
  output: ListOrganizationSubscriptionsOutput,
  func: async ({ zendesk }) => {
    return zendesk.call("GET", "/api/v2/organization_subscriptions") as any
  },
})
