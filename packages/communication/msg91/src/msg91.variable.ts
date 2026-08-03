import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const msg91BaseUrlSchema = z.enum(["https://api.msg91.com/api"]).default("https://api.msg91.com/api")

defineVariable({
  name: 'MSG91_BASE_URL',
  displayName: 'MSG91 Base URL',
  description: 'The base URL for the MSG91 API.',
  variableId: 'MSG91_BASE_URL',
  schema: msg91BaseUrlSchema,
})
