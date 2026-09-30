---
'@pikku/addon-stripe': patch
'@pikku/addon-commerce-stripe': patch
---

Tag what the addon creates in Stripe with an `instanceId` (from the
`FABRIC_INSTANCE_ID` variable, falling back to `FABRIC_STAGE_ID`) on checkout
sessions, payment intents and subscriptions, and acknowledge-and-ignore webhook
events tagged with a different `instanceId`. Stripe fans every event out to
every endpoint on an account, so instances that share an account no longer act
on each other's events. Events with no `instanceId` are processed as before,
and with no instance id configured nothing changes.
