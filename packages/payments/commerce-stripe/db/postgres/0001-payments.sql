CREATE TABLE payment_customer (
  id TEXT PRIMARY KEY NOT NULL,
  owner_type TEXT,
  owner_id TEXT,
  stripe_customer_id TEXT NOT NULL,
  email TEXT,
  created_at TEXT NOT NULL
);

CREATE UNIQUE INDEX payment_customer_stripe_id_unique ON payment_customer (stripe_customer_id);
CREATE UNIQUE INDEX payment_customer_owner_unique ON payment_customer (owner_type, owner_id);
CREATE INDEX payment_customer_email ON payment_customer (email);

CREATE TABLE payment_product (
  id TEXT PRIMARY KEY NOT NULL,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  requires_shipping INTEGER NOT NULL DEFAULT 1,
  active INTEGER NOT NULL DEFAULT 1,
  stripe_product_id TEXT,
  metadata TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX payment_product_slug_unique ON payment_product (slug);
CREATE INDEX payment_product_active ON payment_product (active);

CREATE TABLE payment_variant (
  id TEXT PRIMARY KEY NOT NULL,
  product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  sku TEXT,
  amount_minor INTEGER NOT NULL,
  currency TEXT NOT NULL,
  stock INTEGER,
  position INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  stripe_price_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX payment_variant_product_id ON payment_variant (product_id);
CREATE UNIQUE INDEX payment_variant_sku_unique ON payment_variant (sku);

CREATE TABLE payment_shipping_rate (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  amount_minor INTEGER NOT NULL,
  currency TEXT NOT NULL,
  delivery_min_days INTEGER,
  delivery_max_days INTEGER,
  position INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  stripe_shipping_rate_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX payment_shipping_rate_active ON payment_shipping_rate (active);

CREATE TABLE payment_cart (
  id TEXT PRIMARY KEY NOT NULL,
  token TEXT NOT NULL,
  owner_type TEXT,
  owner_id TEXT,
  email TEXT,
  status TEXT NOT NULL CHECK (status IN ('open', 'converted', 'abandoned')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX payment_cart_token_unique ON payment_cart (token);
CREATE INDEX payment_cart_owner ON payment_cart (owner_type, owner_id);

CREATE TABLE payment_cart_item (
  id TEXT PRIMARY KEY NOT NULL,
  cart_id TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX payment_cart_item_unique ON payment_cart_item (cart_id, variant_id);

CREATE TABLE payment_order (
  id TEXT PRIMARY KEY NOT NULL,
  customer_id TEXT,
  cart_id TEXT,
  email TEXT,
  stripe_checkout_session_id TEXT,
  stripe_payment_intent_id TEXT,
  amount_minor INTEGER NOT NULL,
  amount_refunded_minor INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'authorized', 'processing', 'paid', 'failed', 'expired', 'refunded')),
  capture_method TEXT NOT NULL DEFAULT 'automatic' CHECK (capture_method IN ('automatic', 'manual')),
  amount_captured_minor INTEGER,
  fulfillment_status TEXT NOT NULL DEFAULT 'not_required' CHECK (fulfillment_status IN ('not_required', 'unfulfilled', 'fulfilled')),
  shipping_name TEXT,
  shipping_line1 TEXT,
  shipping_line2 TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_postal_code TEXT,
  shipping_country TEXT,
  dispute_status TEXT CHECK (dispute_status IN ('open', 'won', 'lost')),
  tracking_number TEXT,
  tracking_url TEXT,
  shipped_at TEXT,
  metadata TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX payment_order_session_unique ON payment_order (stripe_checkout_session_id);
CREATE INDEX payment_order_customer_id ON payment_order (customer_id);
CREATE INDEX payment_order_status ON payment_order (status);
CREATE INDEX payment_order_fulfillment_status ON payment_order (fulfillment_status);

CREATE TABLE payment_order_item (
  id TEXT PRIMARY KEY NOT NULL,
  order_id TEXT NOT NULL,
  variant_id TEXT,
  name TEXT NOT NULL,
  sku TEXT,
  quantity INTEGER NOT NULL,
  unit_amount_minor INTEGER NOT NULL,
  currency TEXT NOT NULL,
  requires_shipping INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX payment_order_item_order_id ON payment_order_item (order_id);
CREATE INDEX payment_order_item_variant_id ON payment_order_item (variant_id);

CREATE TABLE payment_refund (
  id TEXT PRIMARY KEY NOT NULL,
  order_id TEXT NOT NULL,
  amount_minor INTEGER NOT NULL,
  reason TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX payment_refund_order_id ON payment_refund (order_id);

CREATE TABLE payment_webhook_event (
  id TEXT PRIMARY KEY NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  received_at TEXT NOT NULL
);

CREATE INDEX payment_webhook_event_type ON payment_webhook_event (type);
