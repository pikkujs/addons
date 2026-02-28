import { SentryService } from './sentry-api.service.js'
import type { SentrySecrets } from './sentry.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<SentrySecrets>('SENTRY_CREDENTIALS')
  const sentry = new SentryService(creds)

  return { sentry }
})
