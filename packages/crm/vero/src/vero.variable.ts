import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const veroBaseUrlSchema = z.enum(["https://api.getvero.com/api/v2"]).default("https://api.getvero.com/api/v2")

wireVariable({
  name: 'VERO_BASE_URL',
  displayName: 'Vero Base URL',
  description: 'The base URL for the Vero API.',
  variableId: 'VERO_BASE_URL',
  schema: veroBaseUrlSchema,
})
