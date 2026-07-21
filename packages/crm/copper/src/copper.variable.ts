import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const copperBaseUrlSchema = z.enum(["https://api.copper.com/developer_api/v1"]).default("https://api.copper.com/developer_api/v1")

wireVariable({
  name: 'COPPER_BASE_URL',
  displayName: 'Copper Base URL',
  description: 'The base URL for the Copper API.',
  variableId: 'COPPER_BASE_URL',
  schema: copperBaseUrlSchema,
})
