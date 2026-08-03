import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const googleContactsBaseUrlSchema = z.enum(["https://people.googleapis.com/v1"]).default("https://people.googleapis.com/v1")

defineVariable({
  name: 'GOOGLE_CONTACTS_BASE_URL',
  displayName: 'Google Contacts Base URL',
  description: 'The base URL for the Google Contacts API.',
  variableId: 'GOOGLE_CONTACTS_BASE_URL',
  schema: googleContactsBaseUrlSchema,
})
