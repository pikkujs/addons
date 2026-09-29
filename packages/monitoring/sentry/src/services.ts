import { WebhookSigningSecret } from '@pikku/core/hmac'
import { SentryService } from './sentry-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const creds = (await secrets.getSecret('SENTRY_CREDENTIALS')).reveal()
  const sentry = new SentryService(creds)

  const sentryWebhookSecret = WebhookSigningSecret.fromCredential(
    'Sentry',
    credentialService,
    'sentryWebhookSecret'
  )


  return { sentry, sentryWebhookSecret }
})
