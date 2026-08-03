import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const theHiveBaseUrlSchema = z.enum(["https://thehive.example.com/api"]).default("https://thehive.example.com/api")

defineVariable({
  name: 'THE_HIVE_BASE_URL',
  displayName: 'TheHive Base URL',
  description: 'The base URL for the TheHive API.',
  variableId: 'THE_HIVE_BASE_URL',
  schema: theHiveBaseUrlSchema,
})
