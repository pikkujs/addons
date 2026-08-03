import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const mailcheckBaseUrlSchema = z.enum(["https://api.mailcheck.ai"]).default("https://api.mailcheck.ai")

defineVariable({
  name: 'MAILCHECK_BASE_URL',
  displayName: 'Mailcheck Base URL',
  description: 'The base URL for the Mailcheck API.',
  variableId: 'MAILCHECK_BASE_URL',
  schema: mailcheckBaseUrlSchema,
})
