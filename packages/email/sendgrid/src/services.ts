import { SendgridService } from './sendgrid-api.service.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const apiKey = await secrets.getSecretJSON<string>('SENDGRID_API_KEY')
  const sendgrid = new SendgridService(apiKey)

  return { sendgrid }
})
