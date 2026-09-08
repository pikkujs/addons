import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const googleContactsTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
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
