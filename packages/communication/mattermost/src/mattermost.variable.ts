import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const mattermostBaseUrlSchema = z.enum(["http://your-mattermost-url.com/api/v4", "https://your-mattermost-url.com/api/v4"]).default("http://your-mattermost-url.com/api/v4")

defineVariable({
  name: 'MATTERMOST_BASE_URL',
  displayName: 'Mattermost Base URL',
  description: 'The base URL for the Mattermost API.',
  variableId: 'MATTERMOST_BASE_URL',
  schema: mattermostBaseUrlSchema,
})
