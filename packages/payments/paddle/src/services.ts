import { WebhookSigningSecret } from '@pikku/core/hmac'
import { PaddleService } from './paddle-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets }) => {
  const creds = (await secrets.getSecret('PADDLE_CREDENTIALS')).reveal()
  const paddle = new PaddleService(creds)

  const paddleWebhookSecret = new WebhookSigningSecret(
    'Paddle',
    await secrets
      .getSecret('PADDLE_WEBHOOK_SECRET')
      .then((secret) => secret.reveal())
      .catch(() => null)
  )


  return { paddle, paddleWebhookSecret }
})
