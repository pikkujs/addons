// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError, UnprocessableContentError } from '@pikku/core/errors'

export const AppsListWebhookDeliveriesInput = z.object({
  per_page: z.number().int().optional().default(30).describe("The number of results per page (max 100)."),
  cursor: z.string().optional().describe("Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors."),
  redelivery: z.boolean().optional(),
})

export const AppsListWebhookDeliveriesOutput = z.array(z.object({
  action: z.string().nullable().describe("The type of activity for the event that triggered the delivery."),
  delivered_at: z.string().datetime().describe("Time when the webhook delivery occurred."),
  duration: z.number().describe("Time spent delivering."),
  event: z.string().describe("The event that triggered the delivery."),
  guid: z.string().describe("Unique identifier for the event (shared with all deliveries for all webhooks that subscribe to this event)."),
  id: z.number().int().describe("Unique identifier of the webhook delivery."),
  installation_id: z.number().int().nullable().describe("The id of the GitHub App installation associated with this event."),
  redelivery: z.boolean().describe("Whether the webhook delivery is a redelivery."),
  repository_id: z.number().int().nullable().describe("The id of the repository associated with this event."),
  status: z.string().describe("Describes the response returned after attempting the delivery."),
  status_code: z.number().int().describe("Status code received when delivery was made."),
}))

export const appsListWebhookDeliveries = pikkuSessionlessFunc({
  description: "Returns a list of webhook deliveries for the webhook configured for a GitHub App.\n\nYou must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.",
  input: AppsListWebhookDeliveriesInput,
  output: AppsListWebhookDeliveriesOutput,
  errors: [BadRequestError, UnprocessableContentError],
  func: async ({ github }, data) => {
    return github.call("GET", "/app/hook/deliveries", data) as any
  },
})
