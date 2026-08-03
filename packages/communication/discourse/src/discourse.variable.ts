import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const discourseBaseUrlSchema = z.enum(["https://discourse.example.com"]).default("https://discourse.example.com")

defineVariable({
  name: 'DISCOURSE_BASE_URL',
  displayName: 'Discourse Base URL',
  description: 'The base URL for the Discourse API.',
  variableId: 'DISCOURSE_BASE_URL',
  schema: discourseBaseUrlSchema,
})
