import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const gristBaseUrlSchema = z.enum(["https://docs.getgrist.com/api"]).default("https://docs.getgrist.com/api")

defineVariable({
  name: 'GRIST_BASE_URL',
  displayName: 'Grist Base URL',
  description: 'The base URL for the Grist API.',
  variableId: 'GRIST_BASE_URL',
  schema: gristBaseUrlSchema,
})
