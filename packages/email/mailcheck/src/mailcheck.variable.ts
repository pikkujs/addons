import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const mailcheckBaseUrlSchema = z.enum(["https://api.mailcheck.ai"]).default("https://api.mailcheck.ai")

wireVariable({
  name: 'MAILCHECK_BASE_URL',
  displayName: 'Mailcheck Base URL',
  description: 'The base URL for the Mailcheck API.',
  variableId: 'MAILCHECK_BASE_URL',
  schema: mailcheckBaseUrlSchema,
})
