import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const mattermostCredentialSchema = z.object({
  token: z.string().describe('Mattermost bearer token'),
})

wireCredential({
  name: 'mattermost',
  displayName: 'Mattermost',
  description: 'Mattermost integration for Pikku',
  type: 'wire',
  schema: mattermostCredentialSchema,
})
