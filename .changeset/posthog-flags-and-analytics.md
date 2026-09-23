---
'@pikku/addon-posthog': patch
---

PostHog as a feature flag source and an analytics sink, both built by
`createPostHog` from the addon's credentials.

The flag source reads PostHog's local-evaluation payload, so the secret gains
`projectApiKey` alongside the personal key. The analytics sink batches
`AnalyticsRecord`s to the ingestion endpoint, sends the organization as
`$groups`, and drops any record that identifies nobody instead of merging every
anonymous visitor into a single person.

Also fixes `eventsCapture`, which sent the personal key to `/api/capture`.
Ingestion lives outside `/api/` and authenticates with the project key, so every
call was being rejected.
