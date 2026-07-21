// orgs — Interact with GitHub Orgs.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { BadRequestError, UnprocessableContentError } from '@pikku/core/errors'

export const OrgsGetWebhookDeliveryInput = z.object({
  org: z.string().describe("The organization name. The name is not case sensitive."),
  hook_id: z.number().int().describe("The unique identifier of the hook."),
  delivery_id: z.number().int(),
})

export const OrgsGetWebhookDeliveryOutput = z.object({
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

export const orgsGetWebhookDelivery = pikkuSessionlessFunc({
  description: "Returns a delivery for a webhook configured in an organization.",
  input: OrgsGetWebhookDeliveryInput,
  output: OrgsGetWebhookDeliveryOutput,
  errors: [BadRequestError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}", data) as any
  },
})
