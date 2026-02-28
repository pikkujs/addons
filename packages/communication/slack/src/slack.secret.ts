import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const slackSecretsSchema = z.object({
  accessToken: z.string().describe('Slack access token'),
})

export type SlackSecrets = z.infer<typeof slackSecretsSchema>

wireSecret({
  name: 'slack',
  displayName: 'Slack API',
  description: 'Team communication platform',
  secretId: 'SLACK_CREDENTIALS',
  schema: slackSecretsSchema,
})
