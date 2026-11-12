---
"@pikku/addon-greptime": patch
---

Add the GreptimeDB telemetry store addon: it provides the `telemetryStore` service for Pikku Studio through a contributor (OTLP writes, SQL reads). Needs a `@pikku/core` that ships the `@pikku/core/telemetry-store` subpaths (not yet released; the ranges name the next patch release, `@pikku/core ^0.12.156` and `@pikku/cli ^0.12.210`).
