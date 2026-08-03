import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const pushoverBaseUrlSchema = z.enum(["https://api.pushover.net/1"]).default("https://api.pushover.net/1")

defineVariable({
  name: 'PUSHOVER_BASE_URL',
  displayName: 'Pushover Base URL',
  description: 'The base URL for the Pushover API.',
  variableId: 'PUSHOVER_BASE_URL',
  schema: pushoverBaseUrlSchema,
})
