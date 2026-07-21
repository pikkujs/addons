// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnprocessableContentError } from '@pikku/core/errors'

export const AppsGetWebhookDeliveryInput = z.object({
  delivery_id: z.number().int(),
})

export const AppsGetWebhookDeliveryOutput = z.object({
  action: z.string().nullable().describe("The type of activity for the event that triggered the delivery."),
  delivered_at: z.string().datetime().describe("Time when the delivery was delivered."),
  duration: z.number().describe("Time spent delivering."),
  event: z.string().describe("The event that triggered the delivery."),
  guid: z.string().describe("Unique identifier for the event (shared with all deliveries for all webhooks that subscribe to this event)."),
  id: z.number().int().describe("Unique identifier of the delivery."),
  installation_id: z.number().int().nullable().describe("The id of the GitHub App installation associated with this event."),
  redelivery: z.boolean().describe("Whether the delivery is a redelivery."),
  repository_id: z.number().int().nullable().describe("The id of the repository associated with this event."),
  request: z.object({
    headers: z.record(z.string(), z.unknown()).nullable().describe("The request headers sent with the webhook delivery."),
    payload: z.record(z.string(), z.unknown()).nullable().describe("The webhook payload."),
  }),
  response: z.object({
    headers: z.record(z.string(), z.unknown()).nullable().describe("The response headers received when the delivery was made."),
    payload: z.string().nullable().describe("The response payload received."),
  }),
  status: z.string().describe("Description of the status of the attempted delivery"),
  status_code: z.number().int().describe("Status code received when delivery was made."),
  url: z.string().optional().describe("The URL target of the delivery."),
}).describe("Delivery made by a webhook.")

export const appsGetWebhookDelivery = pikkuSessionlessFunc({
  description: "Returns a delivery for the webhook configured for a GitHub App.\n\nYou must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.",
  input: AppsGetWebhookDeliveryInput,
  output: AppsGetWebhookDeliveryOutput,
  errors: [BadRequestError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/app/hook/deliveries/{delivery_id}", data) as any
  },
})
