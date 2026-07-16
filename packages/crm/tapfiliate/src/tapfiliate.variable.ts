import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const tapfiliateBaseUrlSchema = z.enum(["https://api.tapfiliate.com/1.6"]).default("https://api.tapfiliate.com/1.6")

wireVariable({
  name: 'TAPFILIATE_BASE_URL',
  displayName: 'Tapfiliate Base URL',
  description: 'The base URL for the Tapfiliate API.',
  variableId: 'TAPFILIATE_BASE_URL',
  schema: tapfiliateBaseUrlSchema,
})
