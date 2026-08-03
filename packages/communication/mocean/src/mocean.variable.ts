import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const moceanBaseUrlSchema = z.enum(["https://rest.moceanapi.com"]).default("https://rest.moceanapi.com")

defineVariable({
  name: 'MOCEAN_BASE_URL',
  displayName: 'mocean Base URL',
  description: 'The base URL for the mocean API.',
  variableId: 'MOCEAN_BASE_URL',
  schema: moceanBaseUrlSchema,
})
