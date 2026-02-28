import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const hubspotSecretsSchema = z.string().describe('HubSpot Private App Access Token')

export type HubspotSecrets = z.infer<typeof hubspotSecretsSchema>

wireSecret({
  name: 'api_key',
  displayName: 'HubSpot API Key',
  description: 'HubSpot Private App Access Token',
  secretId: 'HUBSPOT_API_KEY',
  schema: hubspotSecretsSchema,
})
