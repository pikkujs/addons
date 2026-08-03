import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const mindeeBaseUrlSchema = z.enum(["https://api.mindee.net/v1"]).default("https://api.mindee.net/v1")

defineVariable({
  name: 'MINDEE_BASE_URL',
  displayName: 'Mindee Base URL',
  description: 'The base URL for the Mindee API.',
  variableId: 'MINDEE_BASE_URL',
  schema: mindeeBaseUrlSchema,
})
