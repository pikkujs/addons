// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { NotFoundError } from '@pikku/core/errors'

export const OrgsDeleteWebhookInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
})

export const orgsDeleteWebhook = pikkuSessionlessFunc({
  input: OrgsDeleteWebhookInput,
  errors: [NotFoundError],
  func: async ({ github }, data) => {
    return github.call("DELETE", "/orgs/{org}/hooks/{hook_id}", data)
  },
})
