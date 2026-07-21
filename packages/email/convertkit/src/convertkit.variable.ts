import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const convertkitBaseUrlSchema = z.enum(["https://api.convertkit.com/v3"]).default("https://api.convertkit.com/v3")

wireVariable({
  name: 'CONVERTKIT_BASE_URL',
  displayName: 'ConvertKit Base URL',
  description: 'The base URL for the ConvertKit API.',
  variableId: 'CONVERTKIT_BASE_URL',
  schema: convertkitBaseUrlSchema,
})
