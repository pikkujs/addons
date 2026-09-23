import { CachedFlagSource } from '@pikku/core/flag'
import type {
  CachedFlagSourceOptions,
  DeclaredFlag,
  FlagConfigSnapshot,
} from '@pikku/core/flag'
import { UnleashFlagApi } from './unleash-flag-api.service.js'
import { UnleashFlagMapper } from './unleash-flag-mapper.js'

/**
 * Unleash as a read-only `FeatureFlagSource`.
 *
 * Read through the client API with `fetch` rather than `unleash-client`, whose
 * background poll timer belongs to a long-lived process that a serverless
 * isolate is not allowed to keep between requests.
 *
 * Percentages are approximate across providers: pikku rehashes the subject with
 * its own salt, so a subject near the boundary can fall on the other side of it
 * than Unleash's UI says. The switch and the overrides are exact.
 */
export class UnleashFeatureFlagSource extends CachedFlagSource {
  constructor(
    private readonly api: UnleashFlagApi,
    private readonly mapper: UnleashFlagMapper,
    options: CachedFlagSourceOptions = {}
  ) {
    super(options)
  }

  /** Seeds the cold-start fallback once the project's declared set is known. */
  declare(flags: DeclaredFlag[]): void {
    this.setDeclared(flags)
  }

  protected async fetchSnapshot(): Promise<FlagConfigSnapshot> {
    return this.mapper.toSnapshot(await this.api.listFeatures())
  }
}
