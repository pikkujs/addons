import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const jiraCredentialSchema = z.object({
  apiKey: z.string().describe('Jira API key'),
})

defineCredential({
  name: 'jira',
  displayName: 'Jira',
  description: 'Jira integration for Pikku',
  type: 'wire',
  schema: jiraCredentialSchema,
})
