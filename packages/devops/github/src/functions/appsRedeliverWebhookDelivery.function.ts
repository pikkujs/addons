// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnprocessableContentError } from '@pikku/core/errors'

export const AppsRedeliverWebhookDeliveryInput = z.object({
  delivery_id: z.number().int(),
})

export const AppsRedeliverWebhookDeliveryOutput = z.record(z.string(), z.unknown())

export const appsRedeliverWebhookDelivery = pikkuSessionlessFunc({
  description: "Redeliver a delivery for the webhook configured for a GitHub App.\n\nYou must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.",
  input: AppsRedeliverWebhookDeliveryInput,
  output: AppsRedeliverWebhookDeliveryOutput,
  errors: [BadRequestError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("POST", "/app/hook/deliveries/{delivery_id}/attempts", data) as any
  },
})
