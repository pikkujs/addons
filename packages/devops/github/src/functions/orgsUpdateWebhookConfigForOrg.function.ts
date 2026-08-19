// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const OrgsUpdateWebhookConfigForOrgInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
  content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
  insecure_ssl: z.union([z.string(), z.number()]).optional(),
  secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
  url: z.string().url().optional().describe("The URL to which the payloads will be delivered."),
})

export const OrgsUpdateWebhookConfigForOrgOutput = z.object({
  content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
  insecure_ssl: z.union([z.string(), z.number()]).optional(),
  secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
  url: z.string().url().optional().describe("The URL to which the payloads will be delivered."),
}).describe("Configuration object of the webhook")

export const orgsUpdateWebhookConfigForOrg = pikkuSessionlessFunc({
  description: "Updates the webhook configuration for an organization. To update more information about the webhook, including the `active` state and `events`, use \"[Update an organization webhook ](/rest/reference/orgs#update-an-organization-webhook).\"\n\nAccess tokens must have the `admin:org_hook` scope, and GitHub Apps must have the `organization_hooks:write` permission.",
  input: OrgsUpdateWebhookConfigForOrgInput,
  output: OrgsUpdateWebhookConfigForOrgOutput,
  func: async ({ github }, data) => {
    return github.call("PATCH", "/orgs/{org}/hooks/{hook_id}/config", data) as any
  },
})
