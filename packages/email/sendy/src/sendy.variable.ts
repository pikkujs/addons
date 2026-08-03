import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const sendyBaseUrlSchema = z.enum(["https://sendy.example.com"]).default("https://sendy.example.com")

defineVariable({
  name: 'SENDY_BASE_URL',
  displayName: 'Sendy Base URL',
  description: 'The base URL for the Sendy API.',
  variableId: 'SENDY_BASE_URL',
  schema: sendyBaseUrlSchema,
})
