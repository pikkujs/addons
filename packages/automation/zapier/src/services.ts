import { ZapierService } from './zapier-api.service.js'
import type { ZapierSecrets } from './zapier.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<ZapierSecrets>('ZAPIER_CREDENTIALS')
  const zapier = new ZapierService(creds)

  return { zapier }
})
