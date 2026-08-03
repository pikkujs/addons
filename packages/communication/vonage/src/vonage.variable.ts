import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const vonageBaseUrlSchema = z.enum(["https://rest.nexmo.com"]).default("https://rest.nexmo.com")

defineVariable({
  name: 'VONAGE_BASE_URL',
  displayName: 'Vonage Base URL',
  description: 'The base URL for the Vonage API.',
  variableId: 'VONAGE_BASE_URL',
  schema: vonageBaseUrlSchema,
})
