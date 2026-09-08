import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const microsoftTeamsTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

defineCredential({
  name: 'microsoftTeams',
  displayName: 'Microsoft Teams',
  description: 'Consume the Microsoft Teams (Graph) API',
  type: 'wire',
  schema: microsoftTeamsTokenSchema,
  oauth2: {
    appCredentialSecretId: 'MICROSOFT_TEAMS_OAUTH_APP',
    tokenSecretId: 'MICROSOFT_TEAMS_OAUTH_TOKENS',
    authorizationUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scopes: [
      'Channel.ReadBasic.All',
      'Channel.Create',
      'Channel.Delete.All',
      'ChannelSettings.ReadWrite.All',
      'ChannelMessage.Send',
      'ChannelMessage.Read.All',
      'Chat.ReadWrite',
      'Tasks.ReadWrite',
      'offline_access',
    ],
  },
})
