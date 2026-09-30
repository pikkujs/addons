---
'@pikku/addon-stripe': patch
'@pikku/addon-commerce-stripe': patch
---

Tag what the addon creates in Stripe with an `environmentId` (from the
`ENVIRONMENT_ID` variable, falling back to `FABRIC_STAGE_ID`) on checkout
sessions, payment intents and subscriptions, and acknowledge-and-ignore webhook
events tagged with a different `environmentId`. Stripe fans every event out to
every endpoint on an account, so environments that share an account no longer act
on each other's events. Events with no `environmentId` are processed as before,
and with no environment id configured nothing changes.
