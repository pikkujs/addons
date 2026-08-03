import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const harvestBaseUrlSchema = z.enum(["https://api.harvestapp.com/v2"]).default("https://api.harvestapp.com/v2")

defineVariable({
  name: 'HARVEST_BASE_URL',
  displayName: 'Harvest Base URL',
  description: 'The base URL for the Harvest API.',
  variableId: 'HARVEST_BASE_URL',
  schema: harvestBaseUrlSchema,
})
