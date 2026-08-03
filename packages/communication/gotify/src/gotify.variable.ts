import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const gotifyBaseUrlSchema = z.enum(["https://gotify.example.com"]).default("https://gotify.example.com")

defineVariable({
  name: 'GOTIFY_BASE_URL',
  displayName: 'Gotify Base URL',
  description: 'The base URL for the Gotify API.',
  variableId: 'GOTIFY_BASE_URL',
  schema: gotifyBaseUrlSchema,
})
