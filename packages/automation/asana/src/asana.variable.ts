import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const asanaBaseUrlSchema = z.enum(["https://app.asana.com/api/1.0"]).default("https://app.asana.com/api/1.0")

wireVariable({
  name: 'ASANA_BASE_URL',
  displayName: 'Asana Base URL',
  description: 'The base URL for the Asana API.',
  variableId: 'ASANA_BASE_URL',
  schema: asanaBaseUrlSchema,
})
