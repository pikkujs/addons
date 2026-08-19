import { SendgridService } from './sendgrid-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const sendgrid = new SendgridService(secrets)
  return { sendgrid }
})
