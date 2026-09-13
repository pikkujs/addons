import type { FlagConfig, FlagConfigSnapshot } from '@pikku/core/flag'
import type { UnleashFeature } from './unleash-flag.types.js'

export interface UnleashFlagMapperOptions {
  /** Unleash feature name for a pikku flag name, where the two differ. */
  keyMap?: Record<string, string>
}

const percentOf = (value: string | undefined): number | null => {
  if (value === undefined) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : null
}

const idsOf = (value: string | undefined): string[] =>
  (value ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id.length > 0)

/**
 * Translates Unleash's ordered strategy list into pikku's switch, percentage
 * and per-subject overrides. Pure: no I/O, no caching, no Unleash client.
 *
 * Constraints, segments, variants and non-default stickiness are not mapped. An
 * unmapped strategy can only widen access in Unleash — strategies OR — so
 * ignoring one is the conservative direction, and the flag still answers to its
 * switch.
 */
export class UnleashFlagMapper {
  private readonly inverseKeys: Map<string, string> | undefined

  constructor(options: UnleashFlagMapperOptions = {}) {
    this.inverseKeys = options.keyMap
      ? new Map(Object.entries(options.keyMap).map(([name, key]) => [key, name]))
      : undefined
  }

  toSnapshot(features: UnleashFeature[]): FlagConfigSnapshot {
    const snapshot: FlagConfigSnapshot = {}
    for (const feature of features) {
      snapshot[this.inverseKeys?.get(feature.name) ?? feature.name] =
        this.toConfig(feature)
    }
    return snapshot
  }

  toConfig(feature: UnleashFeature): FlagConfig {
    const overrides: Record<string, boolean> = {}
    let rolloutPercent: number | null = null

    for (const strategy of feature.strategies ?? []) {
      switch (strategy.name) {
        case 'default':
          // "On for everyone": null rather than 100, because null says the
          // percentage is not part of this flag's story, where 100 says a
          // rollout finished and could be wound back.
          rolloutPercent = null
          break

        case 'flexibleRollout':
        case 'gradualRolloutUserId':
        case 'gradualRolloutSessionId':
        case 'gradualRolloutRandom': {
          const percent =
            percentOf(strategy.parameters?.rollout) ??
            percentOf(strategy.parameters?.percentage)
          if (percent !== null) {
            rolloutPercent = Math.max(rolloutPercent ?? 0, percent)
          }
          break
        }

        case 'userWithId':
          for (const id of idsOf(strategy.parameters?.userIds)) {
            overrides[id] = true
          }
          break
      }
    }

    return { enabled: feature.enabled, rolloutPercent, overrides }
  }
}
