---
'@pikku/addon-sendgrid': patch
'@pikku/addon-cloudflare': patch
'@pikku/addon-jenkins': patch
---

Keep the API base path when resolving a request path. `new URL('/mail/send',
'https://api.sendgrid.com/v3')` resolves to `https://api.sendgrid.com/mail/send`,
so every SendGrid and Cloudflare call dropped its `/v3` or `/client/v4`, and a
Jenkins served under a path lost it.
