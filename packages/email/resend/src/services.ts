import { ResendService } from './resend-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const resend = new ResendService(secrets)
  return { resend }
})
