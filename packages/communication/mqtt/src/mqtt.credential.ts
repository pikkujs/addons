import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const mqttCredentialSchema = z.object({
  apiKey: z.string().describe('MQTT API key'),
})

wireCredential({
  name: 'mqtt',
  displayName: 'MQTT',
  description: 'Publish messages to an MQTT broker',
  type: 'wire',
  schema: mqttCredentialSchema,
})
