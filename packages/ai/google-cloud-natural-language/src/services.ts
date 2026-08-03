import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleCloudNaturalLanguageService } from './google-cloud-natural-language-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleCloudNaturalLanguage')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Cloud Natural Language connection — connect Google Cloud Natural Language first')
    }
    const googleCloudNaturalLanguage = new GoogleCloudNaturalLanguageService(cred, variables)

    return { googleCloudNaturalLanguage }
  }
)
