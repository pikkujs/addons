# @pikku/addon-plentymarkets

Plentymarkets e-commerce: orders, items, stock, warehouses, payments, and contacts.

## Functions

**Orders:** `getOrder`, `listOrders`, `createOrder`, `updateOrder`
**Items:** `getItem`, `listItems`, `createItem`, `updateItem`
**Variations:** `getVariation`, `listVariations`, `createVariation`, `updateVariation`
**Categories:** `getCategory`, `listCategories`, `createCategory`, `updateCategory`, `deleteCategory`
**Stock:** `listStock`, `listWarehouseStock`, `correctStock`
**Warehouses:** `getWarehouse`, `listWarehouses`
**Payments:** `getPayment`, `listPayments`, `createPayment`
**Contacts:** `getContact`, `listContacts`, `createContact`, `updateContact`

## Secrets

`PLENTYMARKETS_CREDENTIALS` — fields: baseUrl, apiVersion, and either accessToken or username + password (the addon logs in via `/rest/login`, caches the token and renews it 60s before expiry)

## Dependencies

No additional runtime dependencies.
