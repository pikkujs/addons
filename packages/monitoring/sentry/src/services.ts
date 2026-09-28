import { WebhookSigningSecret } from '@pikku/core/hmac'
import { SentryService } from './sentry-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('SENTRY_CREDENTIALS')).reveal()
  const sentry = new SentryService(creds)

  const sentryWebhookSecret = new WebhookSigningSecret(
    'Sentry',
    await secrets
      .getSecret('SENTRY_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { sentry, sentryWebhookSecret }
})
