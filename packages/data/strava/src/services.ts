import { StravaService } from './strava-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const strava = new StravaService(secrets, variables)

  return { strava }
})
