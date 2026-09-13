import type { AnalyticsRecord, AnalyticsService } from '@pikku/core/analytics'
import type {
  MetaConversionsService,
  MetaEvent,
} from '../meta-conversions-api.service.js'
import { MetaConversionsMapper } from './meta-conversions-mapper.js'

const MAX_EVENTS_PER_REQUEST = 1000

export interface MetaConversionsSinkOptions {
  /**
   * Routes the batch to Meta's Test Events tab instead of the live dataset.
   * The only way to see what Meta actually did with an event — the live
   * response reports how many it received, never how many it could match.
   */
  testEventCode?: string
}

/**
 * Meta as an analytics sink, over the Conversions API.
 *
 * This is a conversion API rather than a product-analytics one, and behaves
 * accordingly: it reports `events_received` for events it matched to nobody,
 * and it deduplicates against the browser pixel on a shared `event_id`, so an
 * event sent without one is counted twice rather than rejected. Neither shows
 * up as an error. `testEventCode` is how you find out.
 *
 * Consent is not gated here. Which events an ad platform is allowed to receive
 * is the app's policy and belongs in the sink's `accepts` predicate, beside the
 * rest of that decision.
 */
export class MetaConversionsSink implements AnalyticsService {
  constructor(
    private readonly meta: MetaConversionsService,
    private readonly mapper = new MetaConversionsMapper(),
    private readonly options: MetaConversionsSinkOptions = {}
  ) {}

  async record(event: AnalyticsRecord): Promise<void> {
    await this.write([event])
  }

  async write(batch: AnalyticsRecord[]): Promise<void> {
    const events: MetaEvent[] = []
    for (const record of batch) {
      const event = await this.mapper.toEvent(record)
      if (event) events.push(event)
    }

    for (let i = 0; i < events.length; i += MAX_EVENTS_PER_REQUEST) {
      await this.meta.sendEvents(
        events.slice(i, i + MAX_EVENTS_PER_REQUEST),
        this.options.testEventCode
      )
    }
  }
}
