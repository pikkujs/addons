---
'@pikku/addon-mailgun': patch
---

Fix every Mailgun request returning 404: endpoints were built as `new URL('/<domain>/messages', 'https://<apiDomain>/v3/')`, and the leading slash resolved against the host root, dropping the `/v3/` segment. Endpoints are now relative to the `/v3/` base.
