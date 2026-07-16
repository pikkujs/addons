import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const mindeeBaseUrlSchema = z.enum(["https://api.mindee.net/v1"]).default("https://api.mindee.net/v1")

wireVariable({
  name: 'MINDEE_BASE_URL',
  displayName: 'Mindee Base URL',
  description: 'The base URL for the Mindee API.',
  variableId: 'MINDEE_BASE_URL',
  schema: mindeeBaseUrlSchema,
})
