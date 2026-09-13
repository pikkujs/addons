import type { AnalyticsRecord, AnalyticsService } from '@pikku/core/analytics'
import type { PosthogService } from '../posthog-api.service.js'
import { PostHogAnalyticsMapper } from './posthog-analytics-mapper.js'
import type { PostHogBatchBody } from './posthog-analytics.types.js'

/**
 * PostHog as an analytics sink.
 *
 * Ingestion is a different surface from the management API `PosthogService`
 * wraps: it posts to `/batch/` rather than under `/api/`, and it authenticates
 * with the PROJECT key in the body rather than the personal key in a header.
 * Sending a personal key there is rejected, which is why this does not reuse
 * `request()`.
 */
export class PostHogAnalyticsSink implements AnalyticsService {
  private readonly projectApiKey: string

  constructor(
    private readonly posthog: PosthogService,
    private readonly mapper = new PostHogAnalyticsMapper()
  ) {
    const key = posthog.projectApiKey
    if (!key) {
      throw new Error(
        'PostHog analytics needs `projectApiKey` in POSTHOG_CREDENTIALS: ' +
          'ingestion authenticates with the project key, not the personal one.'
      )
    }
    this.projectApiKey = key
  }

  async write(batch: AnalyticsRecord[]): Promise<void> {
    if (batch.length === 0) return

    const events = batch
      .map((record) => this.mapper.toEvent(record))
      .filter((event) => event !== undefined)
    if (events.length === 0) return

    const body: PostHogBatchBody = {
      api_key: this.projectApiKey,
      batch: events,
    }

    await this.posthog.ingest('batch', body)
  }
}
