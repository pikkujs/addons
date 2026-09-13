export * from './segment.secret.js'
export * from './segment-api.service.js'
export * from './functions/track/track.function.js'
export * from './functions/identify/identify.function.js'

// Segment as an analytics sink
export { SegmentAnalyticsSink } from './analytics/segment-analytics.sink.js'
export { SegmentAnalyticsMapper } from './analytics/segment-analytics-mapper.js'
export type {
  SegmentTrackCall,
  SegmentAnalyticsMapperOptions,
} from './analytics/segment-analytics-mapper.js'
