import { SpotifyService } from './spotify-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const spotify = new SpotifyService(secrets, variables)

  return { spotify }
})
