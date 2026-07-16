// Webhooks — This resource represents webhooks. Webhooks are calls sent to a URL when an event occurs in Jira for issues specified by a JQL query. Only Connect and OAuth 2.0 apps can register and manage webhooks. For more information, see [Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/#registering-a-webhook-via-the-jira-rest-api-for-connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const GetDynamicWebhooksForAppInput = z.object({
  startAt: z.number().int().optional().default(0).describe("The index of the first item to return in a page of results (page offset)."),
  maxResults: z.number().int().optional().default(100).describe("The maximum number of items to return per page."),
})

export const GetDynamicWebhooksForAppOutput = z.object({
  isLast: z.boolean().optional().describe("Whether this is the last page."),
  maxResults: z.number().int().optional().describe("The maximum number of items that could be returned."),
  nextPage: z.string().url().optional().describe("If there is another page of results, the URL of the next page."),
  self: z.string().url().optional().describe("The URL of the page."),
  startAt: z.number().int().optional().describe("The index of the first item returned."),
  total: z.number().int().optional().describe("The number of items returned."),
  values: z.array(z.object({
    events: z.array(z.enum(["jira:issue_created", "jira:issue_updated", "jira:issue_deleted", "comment_created", "comment_updated", "comment_deleted", "issue_property_set", "issue_property_deleted"])).describe("The Jira events that trigger the webhook."),
    expirationDate: z.number().int().optional().describe("The date after which the webhook is no longer sent. Use [Extend webhook life](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-refresh-put) to extend the date."),
    fieldIdsFilter: z.array(z.string()).optional().describe("A list of field IDs. When the issue changelog contains any of the fields, the webhook `jira:issue_updated` is sent. If this parameter is not present, the app is notified about all field updates."),
    id: z.number().int().describe("The ID of the webhook."),
    issuePropertyKeysFilter: z.array(z.string()).optional().describe("A list of issue property keys. A change of those issue properties triggers the `issue_property_set` or `issue_property_deleted` webhooks. If this parameter is not present, the app is notified about all issue property updates."),
    jqlFilter: z.string().describe("The JQL filter that specifies which issues the webhook is sent for."),
  })).optional().describe("The list of items."),
}).describe("A page of items.")

export const getDynamicWebhooksForApp = pikkuSessionlessFunc({
  description: "Returns a [paginated](#pagination) list of the webhooks registered by the calling app.\n\n**[Permissions](#permissions) required:** Only [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.",
  input: GetDynamicWebhooksForAppInput,
  output: GetDynamicWebhooksForAppOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/webhook", data) as any
  },
})
