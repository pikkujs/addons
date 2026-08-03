import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const mailchimpBaseUrlSchema = z.enum(["https://server.api.mailchimp.com/3.0"]).default("https://server.api.mailchimp.com/3.0")

defineVariable({
  name: 'MAILCHIMP_BASE_URL',
  displayName: 'Mailchimp Base URL',
  description: 'The base URL for the Mailchimp API.',
  variableId: 'MAILCHIMP_BASE_URL',
  schema: mailchimpBaseUrlSchema,
})
