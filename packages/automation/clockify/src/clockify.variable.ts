import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const clockifyBaseUrlSchema = z.enum(["https://api.clockify.me/api/v1"]).default("https://api.clockify.me/api/v1")

wireVariable({
  name: 'CLOCKIFY_BASE_URL',
  displayName: 'Clockify Base URL',
  description: 'The base URL for the Clockify API.',
  variableId: 'CLOCKIFY_BASE_URL',
  schema: clockifyBaseUrlSchema,
})
