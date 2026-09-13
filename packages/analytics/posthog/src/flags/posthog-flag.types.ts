/** The subset of PostHog's local-evaluation payload the flag source reads. */

export interface PostHogProperty {
  key: string
  operator?: string
  value: unknown
  type?: string
  group_type_index?: number
}

export interface PostHogGroup {
  properties?: PostHogProperty[]
  rollout_percentage?: number | null
  variant?: string | null
}

export interface PostHogFlag {
  key: string
  active: boolean
  deleted?: boolean
  filters?: {
    groups?: PostHogGroup[]
    aggregation_group_type_index?: number
  }
}

export interface PostHogLocalEvaluationResponse {
  flags?: PostHogFlag[]
}
