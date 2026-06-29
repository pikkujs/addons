import { PaddleService } from './paddle-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = await secrets.getSecret('PADDLE_CREDENTIALS')
  const paddle = new PaddleService(creds)

  return { paddle }
})
