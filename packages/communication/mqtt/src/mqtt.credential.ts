import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mqttCredentialSchema = z.object({
  apiKey: z.string().describe('MQTT API key'),
})

defineCredential({
  name: 'mqtt',
  displayName: 'MQTT',
  description: 'Publish messages to an MQTT broker',
  type: 'wire',
  schema: mqttCredentialSchema,
})
