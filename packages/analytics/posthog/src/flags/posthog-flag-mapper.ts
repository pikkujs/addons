import type { FlagConfig, FlagConfigSnapshot } from '@pikku/core/flag'
import type { PostHogFlag, PostHogProperty } from './posthog-flag.types.js'

export interface PostHogFlagMapperOptions {
  /**
   * The PostHog group type carrying the organization, as configured in group
   * analytics. Overrides are read from filters on this group's key.
   */
  groupType?: string
  /** PostHog flag key for a pikku flag name, where the two differ. */
  keyMap?: Record<string, string>
}

const asIds = (value: unknown): string[] => {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string')
  }
  return []
}

/**
 * Translates PostHog's filter groups into pikku's switch, percentage and
 * per-subject overrides. Pure: no I/O, no caching, no PostHog client.
 *
 * Cohorts, property filters other than an exact match on the subject key,
 * variants and `super_groups` are deliberately not mapped — a guessed match is
 * worse than a documented gap, because it is a gate someone believes in. A flag
 * using them resolves on its switch and its catch-all rollout alone.
 */
export class PostHogFlagMapper {
  private readonly inverseKeys: Map<string, string> | undefined

  constructor(private readonly options: PostHogFlagMapperOptions = {}) {
    this.inverseKeys = options.keyMap
      ? new Map(Object.entries(options.keyMap).map(([name, key]) => [key, name]))
      : undefined
  }

  toSnapshot(flags: PostHogFlag[]): FlagConfigSnapshot {
    const snapshot: FlagConfigSnapshot = {}
    for (const flag of flags) {
      snapshot[this.inverseKeys?.get(flag.key) ?? flag.key] =
        this.toConfig(flag)
    }
    return snapshot
  }

  toConfig(flag: PostHogFlag): FlagConfig {
    const overrides: Record<string, boolean> = {}
    let rolloutPercent: number | null = null

    for (const group of flag.filters?.groups ?? []) {
      const properties = group.properties ?? []
      const percent = group.rollout_percentage ?? 100

      // A condition with no properties is "everyone, at this percentage" —
      // exactly a rollout. PostHog releases a subject matched by any group, so
      // the widest one decides.
      if (properties.length === 0) {
        rolloutPercent = Math.max(rolloutPercent ?? 0, percent)
        continue
      }

      // A single exact match on the subject key is the shape of a targeted
      // release, and the one property filter that maps onto an override.
      const property = properties.length === 1 ? properties[0]! : undefined
      if (!property || !this.isExact(property) || !this.isSubjectKey(property, flag)) {
        continue
      }
      for (const id of asIds(property.value)) {
        overrides[id] = percent >= 100
      }
    }

    return { enabled: flag.active, rolloutPercent, overrides }
  }

  private isExact(property: PostHogProperty): boolean {
    return property.operator === undefined || property.operator === 'exact'
  }

  /**
   * A group-aggregated flag carries the group key, a person-aggregated one
   * carries `distinct_id`. Both are one opaque subject id to pikku.
   */
  private isSubjectKey(property: PostHogProperty, flag: PostHogFlag): boolean {
    if (flag.filters?.aggregation_group_type_index !== undefined) {
      return property.key === '$group_key' || property.key === this.options.groupType
    }
    return property.key === 'distinct_id' || property.key === '$user_id'
  }
}
