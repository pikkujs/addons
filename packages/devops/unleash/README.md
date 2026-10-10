# @pikku/addon-unleash

Unleash for Pikku: a client for the Unleash API, and a read-only
`FeatureFlagSource` that backs `featureFlag:` gates with Unleash's toggles.

## Feature flags

```ts
import {
  UnleashService,
  UnleashFlagApi,
  UnleashFlagMapper,
  UnleashFeatureFlagSource,
} from '@pikku/addon-unleash'
import { FEATURE_FLAGS } from '#pikku/scopes'

const unleash = new UnleashService({ url, token })
const featureFlags = new UnleashFeatureFlagSource(
  new UnleashFlagApi(unleash),
  new UnleashFlagMapper(),
  { ttlMs: 30_000 }
)
featureFlags.declare(FEATURE_FLAGS)
```

Three classes rather than one: `UnleashFlagApi` reads the API,
`UnleashFlagMapper` translates the payload, and `UnleashFeatureFlagSource` adds
the cache and the fail-open layers. The mapper is pure, so what Unleash means
by a strategy is testable without stubbing a single request.

This is a `FeatureFlagSource` and not a `FeatureFlagStore`: Unleash's own UI is
the operator surface, so the console's Flags tab is read-only against it rather
than a page of buttons that 500.

### What maps

| Unleash | pikku |
| --- | --- |
| `enabled` | the switch |
| `default` strategy | no rollout constraint |
| `flexibleRollout`, `gradualRollout*` | `rolloutPercent` |
| `userWithId` | overrides |

Strategies OR together, so the widest rollout wins.

### What does not

Constraints, segments, variants, and stickiness other than the default. An
unmapped strategy is ignored rather than guessed at — it can only widen access
in Unleash, so ignoring it is the conservative direction, and the flag still
answers to its switch.

Percentages are approximate: pikku rehashes the subject with its own salt, so a
subject near the boundary can fall on the other side of it than Unleash's UI
says. The switch and the overrides are exact.

### Why `fetch` and not `unleash-client`

The SDK polls on a background timer belonging to a long-lived process. A
serverless isolate is not allowed to hold one between requests, so the SDK would
either never refresh or leak a timer per isolate. A plain GET behind
`CachedFlagSource` works in a Worker and on a server, with the same code.

> The icon is a placeholder glyph, not the Unleash logo.
