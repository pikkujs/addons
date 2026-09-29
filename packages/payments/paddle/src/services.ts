import { WebhookSigningSecret } from '@pikku/core/hmac'
import { PaddleService } from './paddle-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const creds = (await secrets.getSecret('PADDLE_CREDENTIALS')).reveal()
  const paddle = new PaddleService(creds)

  const paddleWebhookSecret = WebhookSigningSecret.fromCredential(
    'Paddle',
    credentialService,
    'paddleWebhookSecret'
  )


  return { paddle, paddleWebhookSecret }
})
