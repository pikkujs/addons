import { SlackService } from './slack-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const slack = new SlackService(secrets, variables)

  return { slack }
})
