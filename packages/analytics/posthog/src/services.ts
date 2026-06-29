import { PosthogService } from './posthog-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('POSTHOG_CREDENTIALS')
  const posthog = new PosthogService(creds)

  return { posthog }
})
