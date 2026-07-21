import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const mailchimpBaseUrlSchema = z.enum(["https://server.api.mailchimp.com/3.0"]).default("https://server.api.mailchimp.com/3.0")

wireVariable({
  name: 'MAILCHIMP_BASE_URL',
  displayName: 'Mailchimp Base URL',
  description: 'The base URL for the Mailchimp API.',
  variableId: 'MAILCHIMP_BASE_URL',
  schema: mailchimpBaseUrlSchema,
})
