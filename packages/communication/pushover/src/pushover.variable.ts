import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const pushoverBaseUrlSchema = z.enum(["https://api.pushover.net/1"]).default("https://api.pushover.net/1")

wireVariable({
  name: 'PUSHOVER_BASE_URL',
  displayName: 'Pushover Base URL',
  description: 'The base URL for the Pushover API.',
  variableId: 'PUSHOVER_BASE_URL',
  schema: pushoverBaseUrlSchema,
})
