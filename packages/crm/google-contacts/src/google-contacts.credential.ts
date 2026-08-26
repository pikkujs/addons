import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'
import { defineSecret } from '@pikku/core/secret'

export const googleContactsTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const googleContactsOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

defineCredential({
  name: 'googleContacts',
  displayName: 'Google Contacts',
  description: 'Consume the Google Contacts (People) API',
  type: 'wire',
  schema: googleContactsTokenSchema,
  oauth2: {
    appCredentialSecretId: 'GOOGLE_CONTACTS_OAUTH_APP',
    tokenSecretId: 'GOOGLE_CONTACTS_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['read', 'write'],
  },
})

defineSecret({
  name: 'googleContactsOAuthApp',
  displayName: 'Google Contacts OAuth App',
  description: 'OAuth2 app credentials for Google Contacts',
  secretId: 'GOOGLE_CONTACTS_OAUTH_APP',
  schema: googleContactsOAuthAppSchema,
  optional: true,
})
