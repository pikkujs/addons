import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const iterableBaseUrlSchema = z.enum(["https://api.iterable.com/api"]).default("https://api.iterable.com/api")

defineVariable({
  name: 'ITERABLE_BASE_URL',
  displayName: 'Iterable Base URL',
  description: 'The base URL for the Iterable API.',
  variableId: 'ITERABLE_BASE_URL',
  schema: iterableBaseUrlSchema,
})
