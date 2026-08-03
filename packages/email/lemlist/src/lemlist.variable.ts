import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const lemlistBaseUrlSchema = z.enum(["https://api.lemlist.com/api"]).default("https://api.lemlist.com/api")

defineVariable({
  name: 'LEMLIST_BASE_URL',
  displayName: 'Lemlist Base URL',
  description: 'The base URL for the Lemlist API.',
  variableId: 'LEMLIST_BASE_URL',
  schema: lemlistBaseUrlSchema,
})
