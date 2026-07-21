// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { ForbiddenError, NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposCreateWebhookInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  active: z.boolean().optional().default(true).describe("Determines if notifications are sent when the webhook is triggered. Set to `true` to send notifications."),
  config: z.object({
  content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
  digest: z.string().optional(),
  insecure_ssl: z.union([z.string(), z.number()]).optional(),
  secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
  token: z.string().optional(),
  url: z.string().url().optional().describe("The URL to which the payloads will be delivered."),
}).optional().describe("Key/value pairs to provide settings for this webhook. [These are defined below](https://docs.github.com/rest/reference/repos#create-hook-config-params)."),
  events: z.array(z.string()).optional().default(["push"]).describe("Determines what [events](https://docs.github.com/webhooks/event-payloads) the hook is triggered for."),
  name: z.string().optional().describe("Use `web` to create a webhook. Default: `web`. This parameter only accepts the value `web`."),
})

export const ReposCreateWebhookOutput = z.object({
  active: z.boolean().describe("Determines whether the hook is actually triggered on pushes."),
  config: z.object({
    content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
    digest: z.string().optional(),
    email: z.string().optional(),
    insecure_ssl: z.union([z.string(), z.number()]).optional(),
    password: z.string().optional(),
    room: z.string().optional(),
    secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
    subdomain: z.string().optional(),
    token: z.string().optional(),
    url: z.string().url().optional().describe("The URL to which the payloads will be delivered."),
  }),
  created_at: z.string().datetime(),
  deliveries_url: z.string().url().optional(),
  events: z.array(z.string()).describe("Determines what events the hook is triggered for. Default: ['push']."),
  id: z.number().int().describe("Unique identifier of the webhook."),
  last_response: z.object({
    code: z.number().int().nullable(),
    message: z.string().nullable(),
    status: z.string().nullable(),
  }),
  name: z.string().describe("The name of a valid service, use 'web' for a webhook."),
  ping_url: z.string().url(),
  test_url: z.string().url(),
  type: z.string(),
  updated_at: z.string().datetime(),
  url: z.string().url(),
}).describe("Webhooks for repositories.")

export const reposCreateWebhook = pikkuSessionlessFunc({
  description: "Repositories can have multiple webhooks installed. Each webhook should have a unique `config`. Multiple webhooks can\nshare the same `config` as long as those webhooks do not have any `events` that overlap.",
  input: ReposCreateWebhookInput,
  output: ReposCreateWebhookOutput,
  errors: [ForbiddenError, NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/hooks", data) as any
  },
})
