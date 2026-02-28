import { SendgridService } from './sendgrid-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecretJSON<string>('SENDGRID_API_KEY')
  const sendgrid = new SendgridService(apiKey)

  return { sendgrid }
})
