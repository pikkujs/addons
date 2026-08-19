// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const OrgsUpdateWebhookInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
  active: z.boolean().optional().default(true).describe("Determines if notifications are sent when the webhook is triggered. Set to `true` to send notifications."),
  config: z.object({
  content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
  insecure_ssl: z.union([z.string(), z.number()]).optional(),
  secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
  url: z.string().url().describe("The URL to which the payloads will be delivered."),
}).optional().describe("Key/value pairs to provide settings for this webhook. [These are defined below](https://docs.github.com/rest/reference/orgs#update-hook-config-params)."),
  events: z.array(z.string()).optional().default(["push"]).describe("Determines what [events](https://docs.github.com/webhooks/event-payloads) the hook is triggered for."),
  name: z.string().optional(),
})

export const OrgsUpdateWebhookOutput = z.object({
  active: z.boolean(),
  config: z.object({
    content_type: z.string().optional(),
    insecure_ssl: z.string().optional(),
    secret: z.string().optional(),
    url: z.string().optional(),
  }),
  created_at: z.string().datetime(),
  deliveries_url: z.string().url().optional(),
  events: z.array(z.string()),
  id: z.number().int(),
  name: z.string(),
  ping_url: z.string().url(),
  type: z.string(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("Org Hook")

export const orgsUpdateWebhook = pikkuSessionlessFunc({
  description: "Updates a webhook configured in an organization. When you update a webhook, the `secret` will be overwritten. If you previously had a `secret` set, you must provide the same `secret` or set a new `secret` or the secret will be removed. If you are only updating individual webhook `config` properties, use \"[Update a webhook configuration for an organization](/rest/reference/orgs#update-a-webhook-configuration-for-an-organization).\"",
  input: OrgsUpdateWebhookInput,
  output: OrgsUpdateWebhookOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/orgs/{org}/hooks/{hook_id}", data) as any
  },
})
