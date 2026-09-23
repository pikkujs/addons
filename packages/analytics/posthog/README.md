# @pikku/addon-posthog

PostHog product analytics.

## Functions

- `eventsCapture` — capture analytics events
- `personsList` — list tracked persons

## Feature flags

```ts
import {
  PostHogFlagApi,
  PostHogFlagMapper,
  PostHogFeatureFlagSource,
} from '@pikku/addon-posthog'
import { FEATURE_FLAGS } from '#pikku/scopes'

const featureFlags = new PostHogFeatureFlagSource(
  new PostHogFlagApi(posthog, projectApiKey),
  new PostHogFlagMapper({ groupType: 'organization' }),
  { ttlMs: 30_000 }
)
featureFlags.declare(FEATURE_FLAGS)
```

Three classes rather than one: `PostHogFlagApi` reads local evaluation through
`PosthogService`, `PostHogFlagMapper` translates the payload, and
`PostHogFeatureFlagSource` adds the cache and the fail-open layers. The mapper is
pure, so what PostHog means by a filter group is testable without stubbing a
single request.

A `FeatureFlagSource` and not a `FeatureFlagStore`: PostHog's UI is the operator
surface, so the console's Flags tab is read-only against it rather than a page of
buttons that 500.

### What maps

| PostHog | pikku |
| --- | --- |
| `active` | the switch |
| a condition group with no properties | `rolloutPercent` |
| a single exact match on `$group_key` / `distinct_id` at 100% | an override |

Conditions OR, so the widest catch-all wins.

### What does not

Cohorts, property filters other than an exact match on the subject key, variants
and multivariate payloads, and `super_groups`. A flag using them resolves on its
switch and its catch-all rollout alone — more permissive than PostHog would be
for some subjects, so a flag whose targeting is a cohort belongs in PostHog's own
client SDK, not on a `featureFlag:` gate.

Percentages are approximate: pikku rehashes the subject with its own salt. The
switch and the overrides are exact.

### Why `fetch` and not `posthog-node`

The SDK polls on a background timer belonging to a long-lived process, which a
serverless isolate is not allowed to hold between requests. Local evaluation is
also the only endpoint that hands over whole flag definitions rather than
answering one question about one user, so it is the only one that can back a
snapshot — and it needs the personal API key (`feature_flag:read`) alongside the
project key.

## Secrets

`POSTHOG_CREDENTIALS` — fields: apiKey, host, projectApiKey (feature flags only)

## Dependencies

No additional runtime dependencies.
