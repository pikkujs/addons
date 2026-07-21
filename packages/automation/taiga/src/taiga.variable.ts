import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const taigaBaseUrlSchema = z.enum(["https://api.taiga.io/api/v1"]).default("https://api.taiga.io/api/v1")

wireVariable({
  name: 'TAIGA_BASE_URL',
  displayName: 'Taiga Base URL',
  description: 'The base URL for the Taiga API.',
  variableId: 'TAIGA_BASE_URL',
  schema: taigaBaseUrlSchema,
})
