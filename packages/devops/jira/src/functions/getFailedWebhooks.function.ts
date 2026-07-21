// Webhooks — This resource represents webhooks. Webhooks are calls sent to a URL when an event occurs in Jira for issues specified by a JQL query. Only Connect and OAuth 2.0 apps can register and manage webhooks. For more information, see [Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/#registering-a-webhook-via-the-jira-rest-api-for-connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const GetFailedWebhooksInput = z.object({
  maxResults: z.number().int().optional().describe("The maximum number of webhooks to return per page. If obeying the maxResults directive would result in records with the same failure time being split across pages, the directive is ignored and all records with the same failure time included on the page."),
  after: z.number().int().optional().describe("The time after which any webhook failure must have occurred for the record to be returned, expressed as milliseconds since the UNIX epoch."),
})

export const GetFailedWebhooksOutput = z.object({
  maxResults: z.number().int().describe("The maximum number of items on the page. If the list of values is shorter than this number, then there are no more pages."),
  next: z.string().url().optional().describe("The URL to the next page of results. Present only if the request returned at least one result.The next page may be empty at the time of receiving the response, but new failed webhooks may appear in time. You can save the URL to the next page and query for new results periodically (for example, every hour)."),
  values: z.array(z.object({
    body: z.string().optional().describe("The webhook body."),
    failureTime: z.number().int().describe("The time the webhook was added to the list of failed webhooks (that is, the time of the last failed retry)."),
    id: z.string().describe("The webhook ID, as sent in the `X-Atlassian-Webhook-Identifier` header with the webhook."),
    url: z.string().describe("The original webhook destination."),
  })).describe("The list of webhooks."),
}).describe("A page of failed webhooks.")

export const getFailedWebhooks = pikkuSessionlessFunc({
  description: "Returns webhooks that have recently failed to be delivered to the requesting app after the maximum number of retries.\n\nAfter 72 hours the failure may no longer be returned by this operation.\n\nThe oldest failure is returned first.\n\nThis method uses a cursor-based pagination. To request the next page use the failure time of the last webhook on the list as the `failedAfter` value or use the URL provided in `next`.\n\n**[Permissions](#permissions) required:** Only [Connect apps](https://developer.atlassian.com/cloud/jira/platform/index/#connect-apps) can use this operation.",
  input: GetFailedWebhooksInput,
  output: GetFailedWebhooksOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("GET", "/rest/api/3/webhook/failed", data) as any
  },
})
