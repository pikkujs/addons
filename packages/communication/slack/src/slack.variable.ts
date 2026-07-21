import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const slackBaseUrlSchema = z.enum(["https://slack.com/api"]).default("https://slack.com/api")

wireVariable({
  name: 'SLACK_BASE_URL',
  displayName: 'Slack Base URL',
  description: 'The base URL for the Slack API.',
  variableId: 'SLACK_BASE_URL',
  schema: slackBaseUrlSchema,
})
