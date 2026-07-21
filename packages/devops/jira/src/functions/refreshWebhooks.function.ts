// Webhooks — This resource represents webhooks. Webhooks are calls sent to a URL when an event occurs in Jira for issues specified by a JQL query. Only Connect and OAuth 2.0 apps can register and manage webhooks. For more information, see [Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/#registering-a-webhook-via-the-jira-rest-api-for-connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const RefreshWebhooksInput = z.object({
  webhookIds: z.array(z.number().int()).describe("A list of webhook IDs."),
})

export const RefreshWebhooksOutput = z.object({
  expirationDate: z.number().int().describe("The expiration date of all the refreshed webhooks."),
}).describe("The date the refreshed webhooks expire.")

export const refreshWebhooks = pikkuSessionlessFunc({
  description: "Extends the life of webhook. Webhooks registered through the REST API expire after 30 days. Call this operation to keep them alive.\n\nUnrecognized webhook IDs (those that are not found or belong to other apps) are ignored.\n\n**[Permissions](#permissions) required:** Only [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.",
  input: RefreshWebhooksInput,
  output: RefreshWebhooksOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("PUT", "/rest/api/3/webhook/refresh", data) as any
  },
})
