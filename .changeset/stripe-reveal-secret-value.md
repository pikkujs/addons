---
'@pikku/addon-stripe': patch
---

Reveal the Stripe secrets instead of handing `SecretValue` to the SDK

`@pikku/core` changed `SecretService.getSecret` from `Promise<T>` to
`Promise<SecretValue<T>>` in 0.12.77, but the peer range stayed `^0.12.74` — so
the addon installs happily against both contracts and only one of them works.
Against 0.12.77+ the constructor still succeeds, because `new Stripe(key)` only
stores the value; the throw lands on the first API call, where the SDK builds
`'Bearer ' + key` and `SecretValue[Symbol.toPrimitive]` raises
`SecretCoercionError`. Every Stripe call failed, and the stack pointed at the
SDK rather than at the key.

`STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are now revealed at the service
factory, and the peer/dev range starts at the release that introduced
`SecretValue`.
