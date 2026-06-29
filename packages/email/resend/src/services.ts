import { ResendService } from './resend-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('RESEND_CREDENTIALS')
  const resend = new ResendService(creds)

  return { resend }
})
