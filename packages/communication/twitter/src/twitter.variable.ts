import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const twitterBaseUrlSchema = z.enum(["https://api.twitter.com/2"]).default("https://api.twitter.com/2")

defineVariable({
  name: 'TWITTER_BASE_URL',
  displayName: 'X (Twitter) Base URL',
  description: 'The base URL for the X (Twitter) API.',
  variableId: 'TWITTER_BASE_URL',
  schema: twitterBaseUrlSchema,
})
