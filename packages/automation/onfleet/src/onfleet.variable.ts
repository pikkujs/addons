import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const onfleetBaseUrlSchema = z.enum(["https://onfleet.com/api/v2"]).default("https://onfleet.com/api/v2")

wireVariable({
  name: 'ONFLEET_BASE_URL',
  displayName: 'Onfleet Base URL',
  description: 'The base URL for the Onfleet API.',
  variableId: 'ONFLEET_BASE_URL',
  schema: onfleetBaseUrlSchema,
})
