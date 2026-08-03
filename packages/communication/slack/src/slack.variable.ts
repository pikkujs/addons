import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const slackBaseUrlSchema = z.enum(["https://slack.com/api"]).default("https://slack.com/api")

defineVariable({
  name: 'SLACK_BASE_URL',
  displayName: 'Slack Base URL',
  description: 'The base URL for the Slack API.',
  variableId: 'SLACK_BASE_URL',
  schema: slackBaseUrlSchema,
})
