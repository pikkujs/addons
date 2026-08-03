import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const gitlabCredentialSchema = z.object({
  apiKey: z.string().describe('GitLab API key'),
})

defineCredential({
  name: 'gitlab',
  displayName: 'GitLab',
  description: 'Interact with the GitLab API',
  type: 'wire',
  schema: gitlabCredentialSchema,
})
