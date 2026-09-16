-- Multi-account: which Stripe account a customer, cart or order belongs to.
-- Null means the default account (the single-account case is unchanged).
ALTER TABLE "payment_customer" ADD COLUMN "stripe_account" TEXT;
ALTER TABLE "payment_cart" ADD COLUMN "stripe_account" TEXT;
ALTER TABLE "payment_order" ADD COLUMN "stripe_account" TEXT;
