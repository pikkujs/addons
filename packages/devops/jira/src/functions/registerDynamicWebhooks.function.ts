// Webhooks — This resource represents webhooks. Webhooks are calls sent to a URL when an event occurs in Jira for issues specified by a JQL query. Only Connect and OAuth 2.0 apps can register and manage webhooks. For more information, see [Webhooks](https://developer.atlassian.com/cloud/jira/platform/webhooks/#registering-a-webhook-via-the-jira-rest-api-for-connect-apps).

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, ForbiddenError } from '@pikku/core/errors'

export const RegisterDynamicWebhooksInput = z.object({
  url: z.string().describe("The URL that specifies where to send the webhooks. This URL must use the same base URL as the Connect app. Only a single URL per app is allowed to be registered."),
  webhooks: z.array(z.object({
  events: z.array(z.enum(["jira:issue_created", "jira:issue_updated", "jira:issue_deleted", "comment_created", "comment_updated", "comment_deleted", "issue_property_set", "issue_property_deleted"])).describe("The Jira events that trigger the webhook."),
  fieldIdsFilter: z.array(z.string()).optional().describe("A list of field IDs. When the issue changelog contains any of the fields, the webhook `jira:issue_updated` is sent. If this parameter is not present, the app is notified about all field updates."),
  issuePropertyKeysFilter: z.array(z.string()).optional().describe("A list of issue property keys. A change of those issue properties triggers the `issue_property_set` or `issue_property_deleted` webhooks. If this parameter is not present, the app is notified about all issue property updates."),
  jqlFilter: z.string().describe("The JQL filter that specifies which issues the webhook is sent for. Only a subset of JQL can be used. The supported elements are:\n\n *  Fields: `issueKey`, `project`, `issuetype`, `status`, `assignee`, `reporter`, `issue.property`, and `cf[id]`. For custom fields (`cf[id]`), only the epic label custom field is supported.\".\n *  Operators: `=`, `!=`, `IN`, and `NOT IN`."),
})).describe("A list of webhooks."),
})

export const RegisterDynamicWebhooksOutput = z.object({
  webhookRegistrationResult: z.array(z.object({
    createdWebhookId: z.number().int().optional().describe("The ID of the webhook. Returned if the webhook is created."),
    errors: z.array(z.string()).optional().describe("Error messages specifying why the webhook creation failed."),
  })).optional().describe("A list of registered webhooks."),
}).describe("Container for a list of registered webhooks. Webhook details are returned in the same order as the request.")

export const registerDynamicWebhooks = pikkuSessionlessFunc({
  description: "Registers webhooks.\n\n**NOTE:** for non-public OAuth apps, webhooks are delivered only if there is a match between the app owner and the user who registered a dynamic webhook.\n\n**[Permissions](#permissions) required:** Only [Connect](https://developer.atlassian.com/cloud/jira/platform/#connect-apps) and [OAuth 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps) apps can use this operation.",
  input: RegisterDynamicWebhooksInput,
  output: RegisterDynamicWebhooksOutput,
  errors: [BadRequestError, ForbiddenError],
  func: async ({ jira }, data) => {
    return jira.call("POST", "/rest/api/3/webhook", data) as any
  },
})
