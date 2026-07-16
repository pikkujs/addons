import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const questDbBaseUrlSchema = z.enum(["https://questdb.local"]).default("https://questdb.local")

wireVariable({
  name: 'QUEST_DB_BASE_URL',
  displayName: 'questdb Base URL',
  description: 'The base URL for the questdb API.',
  variableId: 'QUEST_DB_BASE_URL',
  schema: questDbBaseUrlSchema,
})
