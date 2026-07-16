import { GoogleSlidesService } from './google-slides-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleSlides = new GoogleSlidesService(secrets, variables)

  return { googleSlides }
})
