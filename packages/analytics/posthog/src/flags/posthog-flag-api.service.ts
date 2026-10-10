import type { PosthogService } from '../posthog-api.service.js'
import type {
  PostHogFlag,
  PostHogLocalEvaluationResponse,
} from './posthog-flag.types.js'

/**
 * Reads flag definitions out of PostHog.
 *
 * Local evaluation is the only endpoint that hands over a whole flag definition
 * rather than answering one question about one user, so it is the only one that
 * can back a snapshot. It needs both keys: the project key identifies the
 * project, the personal key (with `feature_flag:read`) authorises the read.
 */
export class PostHogFlagApi {
  constructor(
    private readonly posthog: PosthogService,
    private readonly projectApiKey: string
  ) {}

  async listFlags(): Promise<PostHogFlag[]> {
    const body = await this.posthog.request<PostHogLocalEvaluationResponse>(
      'GET',
      'feature_flag/local_evaluation',
      { qs: { token: this.projectApiKey, send_cohorts: false } }
    )
    return (body.flags ?? []).filter((flag) => !flag.deleted)
  }
}
