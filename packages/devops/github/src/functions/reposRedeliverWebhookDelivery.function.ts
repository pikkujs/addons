// repos — Interact with GitHub Repos.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnprocessableContentError } from '@pikku/core/errors'

export const ReposRedeliverWebhookDeliveryInput = z.object({
  owner: z.string().describe("The account owner of the repository. The name is not case sensitive."),
  repo: z.string().describe("The name of the repository. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
  delivery_id: z.number().int(),
})

export const ReposRedeliverWebhookDeliveryOutput = z.record(z.string(), z.unknown())

export const reposRedeliverWebhookDelivery = pikkuSessionlessFunc({
  description: "Redeliver a webhook delivery for a webhook configured in a repository.",
  input: ReposRedeliverWebhookDeliveryInput,
  output: ReposRedeliverWebhookDeliveryOutput,
  errors: [BadRequestError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts", data) as any
  },
})
