import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const googleAnalyticsPropertyIdSchema = z.string()
  .describe('GA4 Property ID (numeric, e.g., 123456789) — required for reporting')

wireVariable({
  name: 'googleAnalytics_propertyId',
  displayName: 'GA4 Property ID',
  description: 'The GA4 property ID for Data API reporting operations',
  variableId: 'GOOGLE_ANALYTICS_PROPERTY_ID',
  schema: googleAnalyticsPropertyIdSchema,
})
