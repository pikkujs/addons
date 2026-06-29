import { DocraptorService } from './docraptor-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('DOCRAPTOR_CREDENTIALS')
  const docraptor = new DocraptorService(creds)

  return { docraptor }
})
