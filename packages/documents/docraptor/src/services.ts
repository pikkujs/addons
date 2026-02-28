import { DocraptorService } from './docraptor-api.service.js'
import type { DocraptorSecrets } from './docraptor.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<DocraptorSecrets>('DOCRAPTOR_CREDENTIALS')
  const docraptor = new DocraptorService(creds)

  return { docraptor }
})
