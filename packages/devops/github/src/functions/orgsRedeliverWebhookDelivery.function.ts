// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnprocessableContentError } from '@pikku/core/errors'

export const OrgsRedeliverWebhookDeliveryInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
  delivery_id: z.number().int(),
})

export const OrgsRedeliverWebhookDeliveryOutput = z.record(z.string(), z.unknown())

export const orgsRedeliverWebhookDelivery = pikkuSessionlessFunc({
  description: "Redeliver a delivery for a webhook configured in an organization.",
  input: OrgsRedeliverWebhookDeliveryInput,
  output: OrgsRedeliverWebhookDeliveryOutput,
  errors: [BadRequestError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts", data) as any
  },
})
