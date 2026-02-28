import { JotformService } from './jotform-api.service.js'
import type { JotformCredentials } from './jotform.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<JotformCredentials>('JOTFORM_CREDENTIALS')
  const jotform = new JotformService(creds)

  return { jotform }
})
