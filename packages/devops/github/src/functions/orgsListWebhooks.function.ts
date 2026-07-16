// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const OrgsListWebhooksInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  page: z.number().int().optional().default(1).describe("Page number of the results to fetch."),
})

export const OrgsListWebhooksOutput = z.array(z.object({
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
}))

export const orgsListWebhooks = pikkuSessionlessFunc({
  input: OrgsListWebhooksInput,
  output: OrgsListWebhooksOutput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/hooks", data) as any
  },
})
