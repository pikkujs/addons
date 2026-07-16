import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const linkedinBaseUrlSchema = z.enum(["https://api.linkedin.com/rest"]).default("https://api.linkedin.com/rest")

wireVariable({
  name: 'LINKEDIN_BASE_URL',
  displayName: 'LinkedIn Base URL',
  description: 'The base URL for the LinkedIn API.',
  variableId: 'LINKEDIN_BASE_URL',
  schema: linkedinBaseUrlSchema,
})
