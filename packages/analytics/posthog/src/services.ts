import { PosthogService } from './posthog-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('POSTHOG_CREDENTIALS')).reveal()
  const posthog = new PosthogService(creds)

  return { posthog }
})
