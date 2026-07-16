import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const lingvanexBaseUrlSchema = z.enum(["https://api-b2b.backenster.com/b1/api/v3"]).default("https://api-b2b.backenster.com/b1/api/v3")

wireVariable({
  name: 'LINGVANEX_BASE_URL',
  displayName: 'LingvaNex Base URL',
  description: 'The base URL for the LingvaNex API.',
  variableId: 'LINGVANEX_BASE_URL',
  schema: lingvanexBaseUrlSchema,
})
