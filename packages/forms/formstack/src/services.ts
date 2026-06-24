import { FormstackService } from './formstack-api.service.js'
import type { FormstackCredentials } from './formstack.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret<FormstackCredentials>('FORMSTACK_CREDENTIALS')
  const formstack = new FormstackService(creds)

  return { formstack }
})
