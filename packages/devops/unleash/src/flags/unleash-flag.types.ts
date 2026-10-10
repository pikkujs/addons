/** The subset of Unleash's client API payload the flag source reads. */

export interface UnleashStrategy {
  name: string
  parameters?: Record<string, string | undefined>
  constraints?: unknown[]
}

export interface UnleashFeature {
  name: string
  enabled: boolean
  strategies?: UnleashStrategy[]
}

export interface UnleashFeaturesResponse {
  features?: UnleashFeature[]
}
