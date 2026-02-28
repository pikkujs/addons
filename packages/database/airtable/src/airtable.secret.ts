import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const airtableSecretsSchema = z.string().describe('Airtable Personal Access Token')

export type AirtableSecrets = z.infer<typeof airtableSecretsSchema>

wireSecret({
  name: 'api_key',
  displayName: 'Airtable API Key',
  description: 'Airtable Personal Access Token',
  secretId: 'AIRTABLE_API_KEY',
  schema: airtableSecretsSchema,
})
