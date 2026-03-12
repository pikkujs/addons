import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const flyioBaseUrlSchema = z.enum(["https://api.machines.dev/v1"]).default("https://api.machines.dev/v1")

wireVariable({
  name: 'FLYIO_BASE_URL',
  displayName: 'Fly.io Base URL',
  description: 'The base URL for the Fly.io API.',
  variableId: 'FLYIO_BASE_URL',
  schema: flyioBaseUrlSchema,
})
