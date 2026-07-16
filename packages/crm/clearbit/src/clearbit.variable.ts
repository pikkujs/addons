import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const clearbitBaseUrlSchema = z.enum(["https://person-stream.clearbit.com"]).default("https://person-stream.clearbit.com")

wireVariable({
  name: 'CLEARBIT_BASE_URL',
  displayName: 'Clearbit Base URL',
  description: 'The base URL for the Clearbit API.',
  variableId: 'CLEARBIT_BASE_URL',
  schema: clearbitBaseUrlSchema,
})
