// apps — Information for integrations and installations.

import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const AppsUpdateWebhookConfigForAppInput = z.object({
  content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
  insecure_ssl: z.union([z.string(), z.number()]).optional(),
  secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
  url: z.string().url().optional().describe("The URL to which the payloads will be delivered."),
})

export const AppsUpdateWebhookConfigForAppOutput = z.object({
  content_type: z.string().optional().describe("The media type used to serialize the payloads. Supported values include `json` and `form`. The default is `form`."),
  insecure_ssl: z.union([z.string(), z.number()]).optional(),
  secret: z.string().optional().describe("If provided, the `secret` will be used as the `key` to generate the HMAC hex digest value for [delivery signature headers](https://docs.github.com/webhooks/event-payloads/#delivery-headers)."),
  url: z.string().url().optional().describe("The URL to which the payloads will be delivered."),
}).describe("Configuration object of the webhook")

export const appsUpdateWebhookConfigForApp = pikkuSessionlessFunc({
  description: "Updates the webhook configuration for a GitHub App. For more information about configuring a webhook for your app, see \"[Creating a GitHub App](/developers/apps/creating-a-github-app).\"\n\nYou must use a [JWT](https://docs.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-a-github-app) to access this endpoint.",
  input: AppsUpdateWebhookConfigForAppInput,
  output: AppsUpdateWebhookConfigForAppOutput,
  func: async ({ github }, data) => {
    return github.call("PATCH", "/app/hook/config", data) as any
  },
})
