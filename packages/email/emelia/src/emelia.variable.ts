import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const emeliaBaseUrlSchema = z.enum(["https://api.emelia.io"]).default("https://api.emelia.io")

defineVariable({
  name: 'EMELIA_BASE_URL',
  displayName: 'Emelia Base URL',
  description: 'The base URL for the Emelia API.',
  variableId: 'EMELIA_BASE_URL',
  schema: emeliaBaseUrlSchema,
})
