import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const nocodbBaseUrlSchema = z.enum(["https://app.nocodb.com"]).default("https://app.nocodb.com")

defineVariable({
  name: 'NOCODB_BASE_URL',
  displayName: 'NocoDB Base URL',
  description: 'The base URL for the NocoDB API.',
  variableId: 'NOCODB_BASE_URL',
  schema: nocodbBaseUrlSchema,
})
