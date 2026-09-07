---
'@pikku/addon-google-analytics': patch
'@pikku/addon-google-cloud-storage': patch
---

Google Analytics reporting and Google Cloud Storage resolve their credential through the wire

Both built their API client once per deployment from the singleton `credentials` service, so every request ran against whatever account the deployment itself had connected. They now build per wire and read through `wire.getCredential`, which resolves by the credential's declared type — so a wiring that overrides `googleAnalyticsOAuth` or `googleCloudStorageOAuth` to `{ mode: 'wire' }` gets one account per user, and one left at its `singleton` default keeps today's behaviour.

Google Analytics keeps its Measurement Protocol client as a singleton service: that one reads a plain secret and has no per-user dimension.

This needs a `@pikku/core` with type-driven credential resolution.
