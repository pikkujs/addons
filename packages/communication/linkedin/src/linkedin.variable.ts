import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const linkedinBaseUrlSchema = z.enum(["https://api.linkedin.com/rest"]).default("https://api.linkedin.com/rest")

defineVariable({
  name: 'LINKEDIN_BASE_URL',
  displayName: 'LinkedIn Base URL',
  description: 'The base URL for the LinkedIn API.',
  variableId: 'LINKEDIN_BASE_URL',
  schema: linkedinBaseUrlSchema,
})
