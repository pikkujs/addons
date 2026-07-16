import { RedditService } from './reddit-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const reddit = new RedditService(secrets, variables)

  return { reddit }
})
