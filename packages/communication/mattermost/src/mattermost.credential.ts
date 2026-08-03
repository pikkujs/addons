import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const mattermostCredentialSchema = z.object({
  token: z.string().describe('Mattermost bearer token'),
})

defineCredential({
  name: 'mattermost',
  displayName: 'Mattermost',
  description: 'Mattermost integration for Pikku',
  type: 'wire',
  schema: mattermostCredentialSchema,
})
