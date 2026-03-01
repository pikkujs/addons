# @pikku/addon-stripe

Stripe payments: charges, customers, coupons, sources, tokens, and meter events.

## Functions

**Balance:** `balanceGet`
**Charges:** `chargeCreate`, `chargeGet`, `chargeList`, `chargeUpdate`
**Coupons:** `couponCreate`, `couponList`
**Customers:** `customerCreate`, `customerGet`, `customerDelete`, `customerUpdate`, `customerList`
**Sources:** `sourceCreate`, `sourceGet`, `sourceDelete`
**Tokens:** `tokenCreate`
**Customer Cards:** `customerCardAdd`, `customerCardGet`, `customerCardRemove`
**Meter Events:** `meterEventCreate`

## Secrets

`STRIPE_SECRET_KEY` — Stripe secret key (string)

## Dependencies

- stripe
