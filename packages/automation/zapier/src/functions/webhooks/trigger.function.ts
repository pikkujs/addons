import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WebhookTriggerInput = z.object({
  webhookUrl: z.string().url().describe('The full Zapier webhook URL to send data to'),
  payload: z.record(z.string(), z.unknown()).describe('JSON payload to send to the webhook'),
})

export const WebhookTriggerOutput = z.object({
  status: z.string().describe('Response status from Zapier'),
  id: z.string().optional().describe('Request ID if returned by Zapier'),
})

type Output = z.infer<typeof WebhookTriggerOutput>

export const webhookTrigger = pikkuSessionlessFunc({
  description: 'Send a JSON payload to a Zapier webhook URL to trigger a Zap',
  node: {
    displayName: 'Trigger Webhook',
    category: 'Webhooks',
    type: 'action',
  },
  input: WebhookTriggerInput,
  output: WebhookTriggerOutput,
  func: async ({ zapier }, { webhookUrl, payload }) => {
    return await zapier.triggerWebhook(webhookUrl, payload) as Output
  },
})
