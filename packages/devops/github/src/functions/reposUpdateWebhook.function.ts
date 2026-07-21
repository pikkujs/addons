// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposUpdateWebhookInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
  active: z.boolean().optional().default(true).describe("Determines if notifications are sent when the webhook is triggered. Set to `true` to send notifications."),
  add_events: z.array(z.string()).optional().describe("Determines a list of events to be added to the list of events that the Hook triggers for."),
  config: z.object({
  address: z.string().optional(),
  content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
  insecure_ssl: z.union([z.string(), z.number()]).optional(),
  room: z.string().optional(),
  secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
  url: z.string().url().describe("The URL to which the payloads will be delivered."),
}).optional().describe("Key/value pairs to provide settings for this webhook. [These are defined below](https://docs.github.com/rest/reference/repos#create-hook-config-params)."),
  events: z.array(z.string()).optional().default(["push"]).describe("Determines what [events](https://docs.github.com/webhooks/event-payloads) the hook is triggered for. This replaces the entire array of events."),
  remove_events: z.array(z.string()).optional().describe("Determines a list of events to be removed from the list of events that the Hook triggers for."),
})

export const ReposUpdateWebhookOutput = z.object({
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

export const reposUpdateWebhook = pikkuSessionlessFunc({
  description: "Updates a webhook configured in a repository. If you previously had a `secret` set, you must provide the same `secret` or set a new `secret` or the secret will be removed. If you are only updating individual webhook `config` properties, use \"[Update a webhook configuration for a repository](/rest/reference/repos#update-a-webhook-configuration-for-a-repository).\"",
  input: ReposUpdateWebhookInput,
  output: ReposUpdateWebhookOutput,
  errors: [NotFoundError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("PATCH", "/repos/{owner}/{repo}/hooks/{hook_id}", data) as any
  },
})
