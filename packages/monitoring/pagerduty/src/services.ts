import { WebhookSigningSecret } from '@pikku/core/hmac'
import { PagerdutyService } from './pagerduty-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('PAGERDUTY_CREDENTIALS')).reveal()
  const pagerduty = new PagerdutyService(creds)

  const pagerdutyWebhookSecret = new WebhookSigningSecret(
    'PagerDuty',
    await secrets
      .getSecret('PAGERDUTY_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { pagerduty, pagerdutyWebhookSecret }
})
