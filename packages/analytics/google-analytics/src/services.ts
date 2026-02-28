import { GoogleAnalyticsService } from './google-analytics-api.service.js'
import { GoogleAnalyticsReportingService } from './google-analytics-reporting.service.js'
import type { GoogleAnalyticsSecrets } from './google-analytics.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const creds = await secrets.getSecretJSON<GoogleAnalyticsSecrets>('GOOGLE_ANALYTICS_CREDENTIALS')
  const googleAnalytics = new GoogleAnalyticsService(creds)

  const propertyId = await variables.get('GOOGLE_ANALYTICS_PROPERTY_ID')
  const googleAnalyticsReporting = propertyId
    ? new GoogleAnalyticsReportingService(propertyId, secrets)
    : undefined

  return { googleAnalytics, googleAnalyticsReporting }
})
