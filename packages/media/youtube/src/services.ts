import { YoutubeService } from './youtube-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const youtube = new YoutubeService(secrets, variables)

  return { youtube }
})
