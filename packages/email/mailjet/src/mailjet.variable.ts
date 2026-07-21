import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const mailjetBaseUrlSchema = z.enum(["https://api.mailjet.com"]).default("https://api.mailjet.com")

wireVariable({
  name: 'MAILJET_BASE_URL',
  displayName: 'Mailjet Base URL',
  description: 'The base URL for the Mailjet API.',
  variableId: 'MAILJET_BASE_URL',
  schema: mailjetBaseUrlSchema,
})
