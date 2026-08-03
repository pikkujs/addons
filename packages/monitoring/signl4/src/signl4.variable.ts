import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const signl4BaseUrlSchema = z.enum(["https://connect.signl4.com/webhook"]).default("https://connect.signl4.com/webhook")

defineVariable({
  name: 'SIGNL4_BASE_URL',
  displayName: 'SIGNL4 Base URL',
  description: 'The base URL for the SIGNL4 API.',
  variableId: 'SIGNL4_BASE_URL',
  schema: signl4BaseUrlSchema,
})
