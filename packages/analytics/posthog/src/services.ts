import { PosthogService } from './posthog-api.service.js'
import type { PosthogSecrets } from './posthog.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<PosthogSecrets>('POSTHOG_CREDENTIALS')
  const posthog = new PosthogService(creds)

  return { posthog }
})
