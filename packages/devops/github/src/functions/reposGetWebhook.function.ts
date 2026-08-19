// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { NotFoundError } from '@pikku/core/errors'

export const ReposGetWebhookInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
})

export const ReposGetWebhookOutput = z.object({
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

export const reposGetWebhook = pikkuSessionlessFunc({
  description: "Returns a webhook configured in a repository. To get only the webhook `config` properties, see \"[Get a webhook configuration for a repository](/rest/reference/repos#get-a-webhook-configuration-for-a-repository).\"",
  input: ReposGetWebhookInput,
  output: ReposGetWebhookOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/repos/{owner}/{repo}/hooks/{hook_id}", data) as any
  },
})
