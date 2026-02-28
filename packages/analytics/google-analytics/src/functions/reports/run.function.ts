import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const DateRangeSchema = z.object({
  startDate: z.string().describe('Start date (YYYY-MM-DD, or relative: today, yesterday, NdaysAgo)'),
  endDate: z.string().describe('End date (YYYY-MM-DD, or relative: today, yesterday, NdaysAgo)'),
})

const MetricSchema = z.object({
  name: z.string().describe('Metric name (e.g., totalUsers, eventCount, sessions, screenPageViews)'),
})

const DimensionSchema = z.object({
  name: z.string().describe('Dimension name (e.g., date, country, city, browser, sourceMedium)'),
})

const OrderBySchema = z.object({
  metric: z.object({ metricName: z.string() }).optional().describe('Order by metric'),
  dimension: z.object({
    dimensionName: z.string(),
    orderType: z.enum(['ALPHANUMERIC', 'CASE_INSENSITIVE_ALPHANUMERIC', 'NUMERIC']).optional(),
  }).optional().describe('Order by dimension'),
  desc: z.boolean().optional().describe('Descending order'),
})

export const ReportRunInput = z.object({
  dateRanges: z.array(DateRangeSchema).min(1).describe('Date ranges for the report'),
  metrics: z.array(MetricSchema).min(1).describe('Metrics to include (e.g., totalUsers, eventCount)'),
  dimensions: z.array(DimensionSchema).optional().describe('Dimensions to break data by (e.g., date, country)'),
  orderBys: z.array(OrderBySchema).optional().describe('Sort order for results'),
  limit: z.number().int().optional().describe('Maximum number of rows to return (1-100000)'),
  offset: z.number().int().optional().describe('Row offset for pagination'),
  keepEmptyRows: z.boolean().optional().describe('Include rows with all zero metric values'),
  currencyCode: z.string().optional().describe('Currency code (ISO 4217, e.g., USD, EUR)'),
  returnPropertyQuota: z.boolean().optional().describe('Include property quota information in response'),
})

const ReportRowSchema = z.object({
  dimensionValues: z.array(z.object({ value: z.string() })).describe('Dimension values for this row'),
  metricValues: z.array(z.object({ value: z.string() })).describe('Metric values for this row'),
})

export const ReportRunOutput = z.object({
  dimensionHeaders: z.array(z.object({ name: z.string() })).describe('Dimension column headers'),
  metricHeaders: z.array(z.object({ name: z.string(), type: z.string() })).describe('Metric column headers'),
  rows: z.array(ReportRowSchema).describe('Report data rows'),
  rowCount: z.number().describe('Total number of rows'),
})

export const reportRun = pikkuSessionlessFunc({
  description: 'Run a report on Google Analytics 4 data with metrics, dimensions, and date ranges',
  node: {
    displayName: 'Run Report',
    category: 'Reports',
    type: 'action',
  },
  input: ReportRunInput,
  output: ReportRunOutput,
  func: async ({ googleAnalyticsReporting }, data) => {
    if (!googleAnalyticsReporting) {
      throw new Error('GA4 reporting requires GOOGLE_ANALYTICS_PROPERTY_ID variable and OAuth2 credentials')
    }
    const result = await googleAnalyticsReporting.runReport(data)
    return {
      dimensionHeaders: result.dimensionHeaders ?? [],
      metricHeaders: result.metricHeaders ?? [],
      rows: result.rows ?? [],
      rowCount: result.rowCount ?? 0,
    }
  },
})
