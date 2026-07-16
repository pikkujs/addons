import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const openWeatherMapCredentialSchema = z.object({
  apiKey: z.string().describe('OpenWeatherMap API key'),
})

wireCredential({
  name: 'openWeatherMap',
  displayName: 'OpenWeatherMap',
  description: 'Gets current and future weather information',
  type: 'wire',
  schema: openWeatherMapCredentialSchema,
})
