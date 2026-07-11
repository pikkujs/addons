---
'@pikku/addon-whatsapp': patch
---

verifyWebhook now accepts pikku's dot-nested query shape. Pikku's `request.query()` parses `hub.mode=subscribe` into `{ hub: { mode } }` (picoquery nesting), while the adapter only read the flat `query['hub.mode']` — so the Meta GET challenge always failed under a pikku HTTP runner. Both shapes are accepted now.
