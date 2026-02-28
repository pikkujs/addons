import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const WebhookTriggerNamedInput = z.object({
  name: z.string().describe('The webhook name as configured in ZAPIER_CREDENTIALS webhookUrls map'),
  payload: z.record(z.string(), z.unknown()).describe('JSON payload to send to the webhook'),
})

export const WebhookTriggerNamedOutput = z.object({
  status: z.string().describe('Response status from Zapier'),
  id: z.string().optional().describe('Request ID if returned by Zapier'),
})

type Output = z.infer<typeof WebhookTriggerNamedOutput>

export const webhookTriggerNamed = pikkuSessionlessFunc({
  description: 'Trigger a named Zapier webhook using a pre-configured webhook URL from secrets',
  node: {
    displayName: 'Trigger Named Webhook',
    category: 'Webhooks',
    type: 'action',
  },
  input: WebhookTriggerNamedInput,
  output: WebhookTriggerNamedOutput,
  func: async ({ zapier }, { name, payload }) => {
    const url = zapier.getWebhookUrl(name)
    if (!url) {
      throw new Error(`Zapier webhook "${name}" not found in configured webhook URLs`)
    }
    return await zapier.triggerWebhook(url, payload) as Output
  },
})
