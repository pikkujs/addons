// Webhooks — This resource represents webhooks. Webhooks are calls sent to a URL when an event occurs in Jira for issues specified by a JQL query. Only Connect and OAuth 2.0 apps can register and manage webhooks. For more information, see [Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/#registering-a-webhook-via-the-jira-rest-api-for-connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const DeleteWebhookByIdInput = z.object({
  webhookIds: z.array(z.number().int()).describe("A list of webhook IDs."),
})

export const deleteWebhookById = pikkuSessionlessFunc({
  description: "Removes webhooks by ID. Only webhooks registered by the calling app are removed. If webhooks created by other apps are specified, they are ignored.\n\n**[Permissions](#permissions) required:** Only [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.",
  input: DeleteWebhookByIdInput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("DELETE", "/rest/api/3/webhook", data)
  },
})
