import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const peekalinkBaseUrlSchema = z.enum(["https://api.peekalink.io"]).default("https://api.peekalink.io")

wireVariable({
  name: 'PEEKALINK_BASE_URL',
  displayName: 'Peekalink Base URL',
  description: 'The base URL for the Peekalink API.',
  variableId: 'PEEKALINK_BASE_URL',
  schema: peekalinkBaseUrlSchema,
})
