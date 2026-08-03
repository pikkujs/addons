import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const raindropBaseUrlSchema = z.enum(["https://api.raindrop.io/rest/v1"]).default("https://api.raindrop.io/rest/v1")

defineVariable({
  name: 'RAINDROP_BASE_URL',
  displayName: 'Raindrop Base URL',
  description: 'The base URL for the Raindrop API.',
  variableId: 'RAINDROP_BASE_URL',
  schema: raindropBaseUrlSchema,
})
