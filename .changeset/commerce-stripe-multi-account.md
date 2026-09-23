---
'@pikku/addon-commerce-stripe': patch
---

Optional multi-account support: a payment owner can resolve to a named Stripe
account (for example by organization country), and customers, carts, orders and
webhook verification are scoped to that account. The single-account setup is
unchanged.

Also adds `unarchiveProduct`, a shipping amount override and a caller discount
on cart checkout, optional `invoice_creation` for one-off purchases,
`createInstallmentSchedule`, EU bank transfer (`createBankTransferIntent`,
`getBankTransferInstructions`, `attachPaymentToInvoice`), and `voidInvoice`,
`cancelPaymentIntent` and `updateInvoice`.
