import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MetadataGetInput = z.object({})

export const MetadataEntrySchema = z.object({
  apiName: z.string().describe('API name to use in reports (e.g., totalUsers, country)'),
  uiName: z.string().describe('Human-readable display name'),
  description: z.string().describe('Description of the dimension or metric'),
  category: z.string().describe('Category grouping'),
})

export const MetadataGetOutput = z.object({
  dimensions: z.array(MetadataEntrySchema).describe('Available dimensions for reporting'),
  metrics: z.array(MetadataEntrySchema.extend({
    type: z.string().describe('Data type of the metric'),
  })).describe('Available metrics for reporting'),
})

export const metadataGet = pikkuSessionlessFunc({
  description: 'List available dimensions and metrics for a GA4 property',
  node: {
    displayName: 'Get Metadata',
    category: 'Reports',
    type: 'action',
  },
  input: MetadataGetInput,
  output: MetadataGetOutput,
  func: async ({ googleAnalyticsReporting }) => {
    if (!googleAnalyticsReporting) {
      throw new Error('GA4 reporting requires GOOGLE_ANALYTICS_PROPERTY_ID variable and OAuth2 credentials')
    }
    return await googleAnalyticsReporting.getMetadata()
  },
})
