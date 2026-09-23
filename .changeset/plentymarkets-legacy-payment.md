---
'@pikku/addon-plentymarkets': patch
---

`createPayment` accepts `order`, `properties` and `updateOrderPaymentStatus`,
matching the legacy `/payments` shape, and `mopId` is now optional.
