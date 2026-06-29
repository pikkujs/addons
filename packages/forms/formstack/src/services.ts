import { FormstackService } from './formstack-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('FORMSTACK_CREDENTIALS')
  const formstack = new FormstackService(creds)

  return { formstack }
})
