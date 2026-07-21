import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const moceanBaseUrlSchema = z.enum(["https://rest.moceanapi.com"]).default("https://rest.moceanapi.com")

wireVariable({
  name: 'MOCEAN_BASE_URL',
  displayName: 'mocean Base URL',
  description: 'The base URL for the mocean API.',
  variableId: 'MOCEAN_BASE_URL',
  schema: moceanBaseUrlSchema,
})
