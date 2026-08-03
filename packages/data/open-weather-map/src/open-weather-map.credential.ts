import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const openWeatherMapCredentialSchema = z.object({
  apiKey: z.string().describe('OpenWeatherMap API key'),
})

defineCredential({
  name: 'openWeatherMap',
  displayName: 'OpenWeatherMap',
  description: 'Gets current and future weather information',
  type: 'wire',
  schema: openWeatherMapCredentialSchema,
})
