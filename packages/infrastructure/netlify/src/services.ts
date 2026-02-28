import { NetlifyService } from './netlify-api.service.js'
import type { NetlifySecrets } from './netlify.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<NetlifySecrets>('NETLIFY_CREDENTIALS')
  const netlify = new NetlifyService(creds)

  return { netlify }
})
