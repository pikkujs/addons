import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const raindropBaseUrlSchema = z.enum(["https://api.raindrop.io/rest/v1"]).default("https://api.raindrop.io/rest/v1")

wireVariable({
  name: 'RAINDROP_BASE_URL',
  displayName: 'Raindrop Base URL',
  description: 'The base URL for the Raindrop API.',
  variableId: 'RAINDROP_BASE_URL',
  schema: raindropBaseUrlSchema,
})
