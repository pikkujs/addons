import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const elevenlabsSecretsSchema = z.string().describe('ElevenLabs API Key')

export type ElevenLabsSecrets = z.infer<typeof elevenlabsSecretsSchema>

wireSecret({
  name: 'api_key',
  displayName: 'ElevenLabs API Key',
  description: 'ElevenLabs API key for speech-to-text and text-to-speech',
  secretId: 'ELEVENLABS_API_KEY',
  schema: elevenlabsSecretsSchema,
})
