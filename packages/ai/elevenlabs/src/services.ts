import { ElevenLabsService } from './elevenlabs-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const apiKey = await secrets.getSecretJSON<string>('ELEVENLABS_API_KEY')
  const elevenlabs = new ElevenLabsService(apiKey)

  return { elevenlabs }
})
