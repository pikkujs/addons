---
"@pikku/addon-greptime": patch
---

Add the GreptimeDB telemetry store addon: it provides the `telemetryStore` service for Pikku Studio through a contributor (OTLP writes, SQL reads). Needs a `@pikku/core` that ships the telemetry-store subpath and contributor `provides`.
