// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const OrgsGetWebhookInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
})

export const OrgsGetWebhookOutput = z.object({
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

export const orgsGetWebhook = pikkuSessionlessFunc({
  description: "Returns a webhook configured in an organization. To get only the webhook `config` properties, see \"[Get a webhook configuration for an organization](/rest/reference/orgs#get-a-webhook-configuration-for-an-organization).\"",
  input: OrgsGetWebhookInput,
  output: OrgsGetWebhookOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/hooks/{hook_id}", data) as any
  },
})
