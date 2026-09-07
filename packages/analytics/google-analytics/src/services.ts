import { GoogleAnalyticsService } from './google-analytics-api.service.js'
import { GoogleAnalyticsReportingService } from './google-analytics-reporting.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('GOOGLE_ANALYTICS_CREDENTIALS')).reveal()
  const googleAnalytics = new GoogleAnalyticsService(creds)

  return { googleAnalytics }
})

/**
 * Reporting is built per wire rather than once per deployment, because
 * `googleAnalyticsOAuth` may be either a single analytics account or one
 * account per user — the wiring decides, and only the wire knows whose
 * request this is.
 */
export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    const getCredential = wire.getCredential
    if (!getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const propertyId = await variables.get('GOOGLE_ANALYTICS_PROPERTY_ID')
    const googleAnalyticsReporting = propertyId
      ? new GoogleAnalyticsReportingService(propertyId, { getCredential })
      : undefined

    return { googleAnalyticsReporting }
  }
)
