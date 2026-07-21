import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const webflowBaseUrlSchema = z.enum(["https://api.webflow.com/v2"]).default("https://api.webflow.com/v2")

wireVariable({
  name: 'WEBFLOW_BASE_URL',
  displayName: 'Webflow Base URL',
  description: 'The base URL for the Webflow API.',
  variableId: 'WEBFLOW_BASE_URL',
  schema: webflowBaseUrlSchema,
})
