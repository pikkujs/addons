-- Multi-account: which Stripe account a customer, cart or order belongs to.
-- Null means the default account (the single-account case is unchanged).
ALTER TABLE "payment_customer" ADD COLUMN "stripe_account" TEXT;
ALTER TABLE "payment_cart" ADD COLUMN "stripe_account" TEXT;
ALTER TABLE "payment_order" ADD COLUMN "stripe_account" TEXT;

-- One customer per owner per account, not per owner: the same owner on two
-- accounts is two Stripe customers. The COALESCE keeps the default account
-- (null) unique too.
DROP INDEX payment_customer_owner_unique;
CREATE UNIQUE INDEX payment_customer_owner_unique ON payment_customer (owner_type, owner_id, COALESCE(stripe_account, ''));
