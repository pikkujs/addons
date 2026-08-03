import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const redditBaseUrlSchema = z.enum(["https://oauth.reddit.com"]).default("https://oauth.reddit.com")

defineVariable({
  name: 'REDDIT_BASE_URL',
  displayName: 'Reddit Base URL',
  description: 'The base URL for the Reddit API.',
  variableId: 'REDDIT_BASE_URL',
  schema: redditBaseUrlSchema,
})
