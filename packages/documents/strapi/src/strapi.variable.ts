import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const strapiBaseUrlSchema = z.enum(["https://api.strapi.local/api"]).default("https://api.strapi.local/api")

wireVariable({
  name: 'STRAPI_BASE_URL',
  displayName: 'Strapi Base URL',
  description: 'The base URL for the Strapi API.',
  variableId: 'STRAPI_BASE_URL',
  schema: strapiBaseUrlSchema,
})
