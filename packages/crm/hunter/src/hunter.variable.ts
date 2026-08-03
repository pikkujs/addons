import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const hunterBaseUrlSchema = z.enum(["https://api.hunter.io/v2"]).default("https://api.hunter.io/v2")

defineVariable({
  name: 'HUNTER_BASE_URL',
  displayName: 'Hunter Base URL',
  description: 'The base URL for the Hunter API.',
  variableId: 'HUNTER_BASE_URL',
  schema: hunterBaseUrlSchema,
})
