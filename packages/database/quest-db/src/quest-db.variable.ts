import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const questDbBaseUrlSchema = z.enum(["https://questdb.local"]).default("https://questdb.local")

defineVariable({
  name: 'QUEST_DB_BASE_URL',
  displayName: 'questdb Base URL',
  description: 'The base URL for the questdb API.',
  variableId: 'QUEST_DB_BASE_URL',
  schema: questDbBaseUrlSchema,
})
