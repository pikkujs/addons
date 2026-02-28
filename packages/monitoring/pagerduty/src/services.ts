import { PagerdutyService } from './pagerduty-api.service.js'
import type { PagerdutySecrets } from './pagerduty.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<PagerdutySecrets>('PAGERDUTY_CREDENTIALS')
  const pagerduty = new PagerdutyService(creds)

  return { pagerduty }
})
