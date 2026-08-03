import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const convertkitBaseUrlSchema = z.enum(["https://api.convertkit.com/v3"]).default("https://api.convertkit.com/v3")

defineVariable({
  name: 'CONVERTKIT_BASE_URL',
  displayName: 'ConvertKit Base URL',
  description: 'The base URL for the ConvertKit API.',
  variableId: 'CONVERTKIT_BASE_URL',
  schema: convertkitBaseUrlSchema,
})
