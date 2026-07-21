import { TwitterService } from './twitter-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const twitter = new TwitterService(secrets, variables)

  return { twitter }
})
