import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const zammadBaseUrlSchema = z.enum(["https://zammad.example.com/api/v1"]).default("https://zammad.example.com/api/v1")

defineVariable({
  name: 'ZAMMAD_BASE_URL',
  displayName: 'Zammad Base URL',
  description: 'The base URL for the Zammad API.',
  variableId: 'ZAMMAD_BASE_URL',
  schema: zammadBaseUrlSchema,
})
