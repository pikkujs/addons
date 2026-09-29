import { WebhookSigningSecret } from '@pikku/core/hmac'
import { ElevenLabsService } from './elevenlabs-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (config, { secrets, credentialService }) => {
  const apiKey = (await secrets.getSecret('ELEVENLABS_API_KEY')).reveal()
  const elevenlabs = new ElevenLabsService(apiKey)

  const elevenlabsWebhookSecret = WebhookSigningSecret.fromCredential(
    'ElevenLabs',
    credentialService,
    'elevenlabsWebhookSecret'
  )


  return { elevenlabs, elevenlabsWebhookSecret }
})
