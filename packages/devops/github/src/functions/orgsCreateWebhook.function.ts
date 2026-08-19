// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const OrgsCreateWebhookInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  active: z.boolean().optional().default(true).describe("Determines if notifications are sent when the webhook is triggered. Set to `true` to send notifications."),
  config: z.object({
  content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
  insecure_ssl: z.union([z.string(), z.number()]).optional(),
  password: z.string().optional(),
  secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
  url: z.string().url().describe("The URL to which the payloads will be delivered."),
  username: z.string().optional(),
}).describe("Key/value pairs to provide settings for this webhook. [These are defined below](https://docs.github.com/rest/reference/orgs#create-hook-config-params)."),
  events: z.array(z.string()).optional().default(["push"]).describe("Determines what [events](https://docs.github.com/webhooks/event-payloads) the hook is triggered for. Set to `[\"*\"]` to receive all possible events."),
  name: z.string().describe("Must be passed as \"web\"."),
})

export const OrgsCreateWebhookOutput = z.object({
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

export const orgsCreateWebhook = pikkuSessionlessFunc({
  description: "Here's how you can create a hook that posts payloads in JSON format:",
  input: OrgsCreateWebhookInput,
  output: OrgsCreateWebhookOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/orgs/{org}/hooks", data) as any
  },
})
