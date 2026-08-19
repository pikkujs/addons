import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const ListUserOrganizationSubscriptionsInput = z.object({
  user_id: z.number().int().describe("The id of the user. Example: 35436"),
})

export const ListUserOrganizationSubscriptionsOutput = z.object({
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

export const listUserOrganizationSubscriptions = pikkuSessionlessFunc({
  description: "Returns a list of organization subscriptions for a specific user.\n\n#### Pagination\n\n* Cursor pagination (recommended)\n* Offset pagination\n\nSee [Pagination](/api-reference/introduction/pagination/).\n\nReturns a maximum of 100 records per page.\n\n#### Allowed For:\n\n* Agents\n* End users\n\nFor end users, the response will only list the subscriptions created by the requesting end user.",
  input: ListUserOrganizationSubscriptionsInput,
  output: ListUserOrganizationSubscriptionsOutput,
  func: async ({ zendesk }, data) => {
    return zendesk.call("GET", "/api/v2/users/{user_id}/organization_subscriptions", data) as any
  },
})
