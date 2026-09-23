---
'@pikku/addon-google-analytics': patch
'@pikku/addon-meta-conversions': patch
'@pikku/addon-segment': patch
---

GA4, Meta Conversions and Segment as `AnalyticsService` sinks, each built by its
addon's factory (`createGoogleAnalytics`, `createMetaConversions`,
`createSegment`).

GA4 and Meta also export an identity resolver. Each sink drops a record that
carries no vendor id, and the resolver supplies one: it reads the `_ga` or
`_fbp`/`_fbc` cookie where the vendor script wrote it, and mints it where none
exists, but only once consent is given. `_fbc` is derived from the current
URL's `fbclid`, so a newer click replaces the stored value. Segment passes
props through untouched and falls back to `anonymousId` when there is no user.
