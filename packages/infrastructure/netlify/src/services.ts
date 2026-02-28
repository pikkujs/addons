import { NetlifyService } from './netlify-api.service.js'
import type { NetlifySecrets } from './netlify.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<NetlifySecrets>('NETLIFY_CREDENTIALS')
  const netlify = new NetlifyService(creds)

  return { netlify }
})
