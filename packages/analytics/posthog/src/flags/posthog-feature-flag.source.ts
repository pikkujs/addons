import { CachedFlagSource } from '@pikku/core/flag'
import type {
  CachedFlagSourceOptions,
  DeclaredFlag,
  FlagConfigSnapshot,
} from '@pikku/core/flag'
import { PostHogFlagApi } from './posthog-flag-api.service.js'
import { PostHogFlagMapper } from './posthog-flag-mapper.js'

/**
 * PostHog as a read-only `FeatureFlagSource`.
 *
 * A source and deliberately not a `FeatureFlagStore`: PostHog's own UI is the
 * operator surface, and writing flags back through its management API would
 * leave two systems owning one row.
 *
 * It reads through `PosthogService`'s plain `fetch` rather than `posthog-node`,
 * whose background poll timer belongs to a long-lived process that a serverless
 * isolate is not allowed to keep between requests.
 */
export class PostHogFeatureFlagSource extends CachedFlagSource {
  constructor(
    private readonly api: PostHogFlagApi,
    private readonly mapper: PostHogFlagMapper,
    options: CachedFlagSourceOptions = {}
  ) {
    super(options)
  }

  /** Seeds the cold-start fallback once the project's declared set is known. */
  declare(flags: DeclaredFlag[]): void {
    this.setDeclared(flags)
  }

  protected async fetchSnapshot(): Promise<FlagConfigSnapshot> {
    return this.mapper.toSnapshot(await this.api.listFlags())
  }
}
