import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const cortexBaseUrlSchema = z.enum(["https://cortex.example.com/api"]).default("https://cortex.example.com/api")

wireVariable({
  name: 'CORTEX_BASE_URL',
  displayName: 'Cortex Base URL',
  description: 'The base URL for the Cortex API.',
  variableId: 'CORTEX_BASE_URL',
  schema: cortexBaseUrlSchema,
})
