import { GoogleDocsService } from './google-docs-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleDocs = new GoogleDocsService(secrets, variables)

  return { googleDocs }
})
