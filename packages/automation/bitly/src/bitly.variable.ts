import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const bitlyBaseUrlSchema = z.enum(["https://api-ssl.bitly.com/v4"]).default("https://api-ssl.bitly.com/v4")

wireVariable({
  name: 'BITLY_BASE_URL',
  displayName: 'bitly Base URL',
  description: 'The base URL for the bitly API.',
  variableId: 'BITLY_BASE_URL',
  schema: bitlyBaseUrlSchema,
})
