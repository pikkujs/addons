import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const nasaBaseUrlSchema = z.enum(["https://api.nasa.gov"]).default("https://api.nasa.gov")

defineVariable({
  name: 'NASA_BASE_URL',
  displayName: 'NASA Base URL',
  description: 'The base URL for the NASA API.',
  variableId: 'NASA_BASE_URL',
  schema: nasaBaseUrlSchema,
})
