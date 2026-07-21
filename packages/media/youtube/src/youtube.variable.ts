import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const youtubeBaseUrlSchema = z.enum(["https://youtube.googleapis.com/"]).default("https://youtube.googleapis.com/")

wireVariable({
  name: 'YOUTUBE_BASE_URL',
  displayName: 'YouTube Base URL',
  description: 'The base URL for the YouTube API.',
  variableId: 'YOUTUBE_BASE_URL',
  schema: youtubeBaseUrlSchema,
})
