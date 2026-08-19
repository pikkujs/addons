import { PaddleService } from './paddle-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('PADDLE_CREDENTIALS')).reveal()
  const paddle = new PaddleService(creds)

  return { paddle }
})
