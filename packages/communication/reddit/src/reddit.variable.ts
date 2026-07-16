import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const redditBaseUrlSchema = z.enum(["https://oauth.reddit.com"]).default("https://oauth.reddit.com")

wireVariable({
  name: 'REDDIT_BASE_URL',
  displayName: 'Reddit Base URL',
  description: 'The base URL for the Reddit API.',
  variableId: 'REDDIT_BASE_URL',
  schema: redditBaseUrlSchema,
})
