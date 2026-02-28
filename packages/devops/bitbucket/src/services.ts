import { BitbucketService } from './bitbucket-api.service.js'
import type { BitbucketSecrets } from './bitbucket.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<BitbucketSecrets>('BITBUCKET_CREDENTIALS')
  const bitbucket = new BitbucketService(creds)

  return { bitbucket }
})
