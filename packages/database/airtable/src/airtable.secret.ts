import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const airtableSecretsSchema = z.string().describe('Airtable Personal Access Token')

export type AirtableSecrets = z.infer<typeof airtableSecretsSchema>

defineSecret({
  name: 'api_key',
  displayName: 'Airtable API Key',
  description: 'Airtable Personal Access Token',
  secretId: 'AIRTABLE_API_KEY',
  schema: airtableSecretsSchema,
})
