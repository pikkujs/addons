import { GoogleCloudNaturalLanguageService } from './google-cloud-natural-language-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleCloudNaturalLanguage = new GoogleCloudNaturalLanguageService(secrets, variables)

  return { googleCloudNaturalLanguage }
})
