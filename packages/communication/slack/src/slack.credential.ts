import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'
import { wireSecret } from '@pikku/core/secret'

export const slackTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
})

export const slackOAuthAppSchema = z.object({
  clientId: z.string().describe('OAuth2 app client ID'),
  clientSecret: z.string().describe('OAuth2 app client secret'),
})

wireCredential({
  name: 'slack',
  displayName: 'Slack',
  description: 'Slack integration for Pikku',
  type: 'wire',
  schema: slackTokenSchema,
  oauth2: {
    appCredentialSecretId: 'SLACK_OAUTH_APP',
    tokenSecretId: 'SLACK_OAUTH_TOKENS',
    authorizationUrl: 'https://slack.com/oauth/authorize',
    tokenUrl: 'https://slack.com/api/oauth.access',
    scopes: ['admin', 'admin.apps:read', 'admin.apps:write', 'admin.conversations:read', 'admin.conversations:write', 'admin.invites:read', 'admin.invites:write', 'admin.teams:read', 'admin.teams:write', 'admin.usergroups:read', 'admin.usergroups:write', 'admin.users:read', 'admin.users:write', 'authorizations:read', 'bot', 'calls:read', 'calls:write', 'channels:history', 'channels:manage', 'channels:read', 'channels:write', 'chat:write', 'chat:write:bot', 'chat:write:user', 'conversations:history', 'conversations:read', 'conversations:write', 'dnd:read', 'dnd:write', 'emoji:read', 'files:read', 'files:write:user', 'groups:history', 'groups:read', 'groups:write', 'identity.basic', 'im:history', 'im:read', 'im:write', 'links:write', 'mpim:history', 'mpim:read', 'mpim:write', 'none', 'pins:read', 'pins:write', 'reactions:read', 'reactions:write', 'reminders:read', 'reminders:write', 'remote_files:read', 'remote_files:share', 'remote_files:write', 'rtm:stream', 'search:read', 'stars:read', 'stars:write', 'team:read', 'tokens.basic', 'usergroups:read', 'usergroups:write', 'users.profile:read', 'users.profile:write', 'users:read', 'users:read.email', 'users:write', 'workflow.steps:execute'],
  },
})

wireSecret({
  name: 'slackOAuthApp',
  displayName: 'Slack OAuth App',
  description: 'OAuth2 app credentials for Slack',
  secretId: 'SLACK_OAUTH_APP',
  schema: slackOAuthAppSchema,
})
