import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const rocketchatCredentialSchema = z.object({
  apiKey: z.string().describe('RocketChat API key'),
})

defineCredential({
  name: 'rocketchat',
  displayName: 'RocketChat',
  description: 'RocketChat integration for Pikku',
  type: 'wire',
  schema: rocketchatCredentialSchema,
})
