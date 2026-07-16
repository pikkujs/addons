import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const facebookGraphApiBaseUrlSchema = z.enum(["https://graph.facebook.com"]).default("https://graph.facebook.com")

wireVariable({
  name: 'FACEBOOK_GRAPH_API_BASE_URL',
  displayName: 'Facebook Graph API Base URL',
  description: 'The base URL for the Facebook Graph API API.',
  variableId: 'FACEBOOK_GRAPH_API_BASE_URL',
  schema: facebookGraphApiBaseUrlSchema,
})
