import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const ghostBaseUrlSchema = z.enum(["https://example.ghost.io/ghost/api"]).default("https://example.ghost.io/ghost/api")

wireVariable({
  name: 'GHOST_BASE_URL',
  displayName: 'Ghost Base URL',
  description: 'The base URL for the Ghost API.',
  variableId: 'GHOST_BASE_URL',
  schema: ghostBaseUrlSchema,
})
