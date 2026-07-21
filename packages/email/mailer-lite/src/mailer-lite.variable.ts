import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const mailerLiteBaseUrlSchema = z.enum(["https://connect.mailerlite.com/api"]).default("https://connect.mailerlite.com/api")

wireVariable({
  name: 'MAILER_LITE_BASE_URL',
  displayName: 'MailerLite Base URL',
  description: 'The base URL for the MailerLite API.',
  variableId: 'MAILER_LITE_BASE_URL',
  schema: mailerLiteBaseUrlSchema,
})
