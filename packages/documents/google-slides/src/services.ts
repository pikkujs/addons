import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleSlidesService } from './google-slides-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleSlides')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Slides connection — connect Google Slides first')
    }
    const googleSlides = new GoogleSlidesService(cred, variables)

    return { googleSlides }
  }
)
