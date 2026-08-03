import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const wekanBaseUrlSchema = z.enum(["https://wekan.example.com/api"]).default("https://wekan.example.com/api")

defineVariable({
  name: 'WEKAN_BASE_URL',
  displayName: 'Wekan Base URL',
  description: 'The base URL for the Wekan API.',
  variableId: 'WEKAN_BASE_URL',
  schema: wekanBaseUrlSchema,
})
