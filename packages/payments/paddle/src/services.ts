import { PaddleService } from './paddle-api.service.js'
import type { PaddleSecrets } from './paddle.secret.js'
import { pikkuExternalServices } from '#pikku'

export const createSingletonServices = pikkuExternalServices(async (config, { secrets }) => {
  const creds = await secrets.getSecretJSON<PaddleSecrets>('PADDLE_CREDENTIALS')
  const paddle = new PaddleService(creds)

  return { paddle }
})
