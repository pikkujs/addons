import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const cortexBaseUrlSchema = z.enum(["https://cortex.example.com/api"]).default("https://cortex.example.com/api")

defineVariable({
  name: 'CORTEX_BASE_URL',
  displayName: 'Cortex Base URL',
  description: 'The base URL for the Cortex API.',
  variableId: 'CORTEX_BASE_URL',
  schema: cortexBaseUrlSchema,
})
