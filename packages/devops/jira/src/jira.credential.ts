import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const jiraCredentialSchema = z.object({
  apiKey: z.string().describe('Jira API key'),
})

wireCredential({
  name: 'jira',
  displayName: 'Jira',
  description: 'Jira integration for Pikku',
  type: 'wire',
  schema: jiraCredentialSchema,
})
