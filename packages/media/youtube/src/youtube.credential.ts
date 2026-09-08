import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const youtubeTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'youtube',
  displayName: 'YouTube',
  description: 'YouTube integration for Pikku',
  type: 'wire',
  schema: youtubeTokenSchema,
  oauth2: {
    appCredentialSecretId: 'YOUTUBE_OAUTH_APP',
    tokenSecretId: 'YOUTUBE_OAUTH_TOKENS',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: [
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.channel-memberships.creator',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtubepartner',
      'https://www.googleapis.com/auth/youtubepartner-channel-audit',
    ],
    additionalParams: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
})
