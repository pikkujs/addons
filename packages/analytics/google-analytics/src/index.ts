// Google Analytics functions - Events (Measurement Protocol)
export { eventSend } from './functions/events/send.function.js'
export { eventValidate } from './functions/events/validate.function.js'

// Google Analytics functions - Reports (Data API)
export { reportRun } from './functions/reports/run.function.js'
export { metadataGet } from './functions/reports/metadata.function.js'

// Google Analytics as an analytics sink
export { GoogleAnalyticsSink } from './analytics/google-analytics.sink.js'
export { GoogleAnalyticsMapper } from './analytics/google-analytics-mapper.js'
export type {
  GA4MappedEvent,
  GoogleAnalyticsMapperOptions,
} from './analytics/google-analytics-mapper.js'
