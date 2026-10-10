import type { AnalyticsRecord, AnalyticsService } from '@pikku/core/analytics'
import type { SegmentService } from '../segment-api.service.js'
import { SegmentAnalyticsMapper } from './segment-analytics-mapper.js'

const MAX_CALLS_PER_REQUEST = 100

/**
 * Segment as an analytics sink.
 *
 * The cheapest sink to reach a destination with, because Segment is itself a
 * fan-out: one mapping here reaches everything the account already has wired,
 * and a new destination is added in Segment rather than in this repository.
 * The cost is Segment's own — an event pikku never mapped is an event only
 * Segment's UI can explain.
 *
 * A record that identifies nobody is dropped rather than sent under a literal
 * anonymous id, which would merge every such event into one fictional person.
 */
export class SegmentAnalyticsSink implements AnalyticsService {
  constructor(
    private readonly segment: SegmentService,
    private readonly mapper = new SegmentAnalyticsMapper()
  ) {}

  async write(batch: AnalyticsRecord[]): Promise<void> {
    const calls = batch
      .map((record) => this.mapper.toCall(record))
      .filter((call) => call !== undefined)

    for (let i = 0; i < calls.length; i += MAX_CALLS_PER_REQUEST) {
      await this.segment.request('POST', 'batch', {
        body: { batch: calls.slice(i, i + MAX_CALLS_PER_REQUEST) },
      })
    }
  }
}
