import { WebhookSigningSecret } from '@pikku/core/hmac'
import { PagerdutyService } from './pagerduty-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const creds = (await secrets.getSecret('PAGERDUTY_CREDENTIALS')).reveal()
  const pagerduty = new PagerdutyService(creds)

  const pagerdutyWebhookSecret = WebhookSigningSecret.fromCredential(
    'PagerDuty',
    credentialService,
    'pagerdutyWebhookSecret'
  )


  return { pagerduty, pagerdutyWebhookSecret }
})
