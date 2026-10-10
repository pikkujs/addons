---
'@pikku/addon-plentymarkets': minor
---

Accept `username` and `password` in `PLENTYMARKETS_CREDENTIALS` as an alternative to a static `accessToken`. The addon logs in via `/rest/login`, caches the token and renews it shortly before it expires (retrying once on a 401), like the Rails client.
