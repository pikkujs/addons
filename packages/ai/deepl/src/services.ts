import { DeeplService } from './deepl-api.service.js'
import type { DeeplSecrets } from './deepl.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<DeeplSecrets>('DEEPL_CREDENTIALS')
  const deepl = new DeeplService(creds)

  return { deepl }
})
