import type { UnleashService } from '../unleash-api.service.js'
import type {
  UnleashFeature,
  UnleashFeaturesResponse,
} from './unleash-flag.types.js'

/** Reads feature definitions out of Unleash's client API. */
export class UnleashFlagApi {
  constructor(private readonly unleash: UnleashService) {}

  async listFeatures(): Promise<UnleashFeature[]> {
    const body = await this.unleash.request<UnleashFeaturesResponse>(
      'GET',
      'client/features'
    )
    return body.features ?? []
  }
}
