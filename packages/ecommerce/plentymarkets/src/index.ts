// Orders
export { getOrder } from './functions/orders/get.function.js'
export { listOrders } from './functions/orders/list.function.js'
export { createOrder } from './functions/orders/create.function.js'
export { updateOrder } from './functions/orders/update.function.js'

// Items
export { getItem } from './functions/items/get.function.js'
export { listItems } from './functions/items/list.function.js'
export { createItem } from './functions/items/create.function.js'
export { updateItem } from './functions/items/update.function.js'

// Variations
export { getVariation } from './functions/variations/get.function.js'
export { getVariationSyncData } from './functions/variations/sync-data.function.js'
export { listVariations } from './functions/variations/list.function.js'
export { createVariation } from './functions/variations/create.function.js'
export { updateVariation } from './functions/variations/update.function.js'

// Availabilities
export { listAvailabilities } from './functions/availabilities/list.function.js'

// Categories
export { getCategory } from './functions/categories/get.function.js'
export { listCategories } from './functions/categories/list.function.js'
export { createCategory } from './functions/categories/create.function.js'
export { updateCategory } from './functions/categories/update.function.js'
export { deleteCategory } from './functions/categories/delete.function.js'

// Stock
export { listStock } from './functions/stock/list.function.js'
export { listWarehouseStock } from './functions/stock/list-warehouse-stock.function.js'
export { correctStock } from './functions/stock/correct.function.js'

// Warehouses
export { getWarehouse } from './functions/warehouses/get.function.js'
export { listWarehouses } from './functions/warehouses/list.function.js'

// Payments
export { getPayment } from './functions/payments/get.function.js'
export { listPayments } from './functions/payments/list.function.js'
export { createPayment } from './functions/payments/create.function.js'
export { searchOrderPayments } from './functions/payments/search-by-order.function.js'

// Webhooks
export {
  plentymarketsWebhookHandler,
  PLENTYMARKETS_WEBHOOK_QUEUE,
} from './functions/webhooks/handle.function.js'
export { plentymarketsHTTPRoutes } from './webhooks.http.js'

// Schemas + types — so a consuming app can type the values it reads back off an RPC
// result (getOrder → PlentyOrder, searchOrderPayments → PlentyPayment, …) without
// re-declaring the shapes the addon already owns.
export * from './schemas.js'

// Contacts
export { getContact } from './functions/contacts/get.function.js'
export { listContacts } from './functions/contacts/list.function.js'
export { createContact } from './functions/contacts/create.function.js'
export { updateContact } from './functions/contacts/update.function.js'
