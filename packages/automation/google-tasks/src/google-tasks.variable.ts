import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const googleTasksBaseUrlSchema = z.enum(["https://tasks.googleapis.com"]).default("https://tasks.googleapis.com")

defineVariable({
  name: 'GOOGLE_TASKS_BASE_URL',
  displayName: 'Google Tasks Base URL',
  description: 'The base URL for the Google Tasks API.',
  variableId: 'GOOGLE_TASKS_BASE_URL',
  schema: googleTasksBaseUrlSchema,
})
