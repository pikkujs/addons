import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const timescaleDbBaseUrlSchema = z.enum(["https://timescale.local"]).default("https://timescale.local")

wireVariable({
  name: 'TIMESCALE_DB_BASE_URL',
  displayName: 'timescaledb Base URL',
  description: 'The base URL for the timescaledb API.',
  variableId: 'TIMESCALE_DB_BASE_URL',
  schema: timescaleDbBaseUrlSchema,
})
