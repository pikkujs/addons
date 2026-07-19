import { z } from 'zod'

// Order sub-schemas
export const PlentyOrderAmountSchema = z.object({
  currency: z.string().optional(),
  exchangeRate: z.number().optional(),
  netTotal: z.number().optional(),
  grossTotal: z.number().optional(),
  vatTotal: z.number().optional(),
  invoiceTotal: z.number().optional(),
  paidAmount: z.number().optional(),
})

export const PlentyOrderItemSchema = z.object({
  id: z.number().optional(),
  orderId: z.number().optional(),
  typeId: z.number().optional(),
  itemVariationId: z.number().optional(),
  quantity: z.number().optional(),
  orderItemName: z.string().optional(),
  attributeValues: z.string().optional(),
  shippingProfileId: z.number().optional(),
})

// Order reference relations. Populated only when the order is fetched `with`
// orderReferences / reverseOrderReferences (see getOrder's withRelations option).
// A credit note points back at its parent order via orderReferences[].originOrderId;
// a parent order lists its credit notes via reverseOrderReferences[].orderId.
export const PlentyOrderReferenceSchema = z.object({
  referenceType: z.string().optional(),
  referenceOrderId: z.number().optional(),
  orderId: z.number().optional(),
  originOrderId: z.number().optional(),
  referencedOrderId: z.number().optional(),
})

export const PlentyOrderSchema = z.object({
  id: z.number(),
  typeId: z.number().optional(),
  statusId: z.number().optional(),
  statusName: z.string().optional(),
  ownerId: z.number().optional(),
  referrerId: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  plentyId: z.number().optional(),
  locationId: z.number().optional(),
  lockStatus: z.string().optional(),
  amounts: z.array(PlentyOrderAmountSchema).optional(),
  orderItems: z.array(PlentyOrderItemSchema).optional(),
  properties: z.array(z.record(z.string(), z.unknown())).optional(),
  addressRelations: z.array(z.record(z.string(), z.unknown())).optional(),
  orderReferences: z.array(PlentyOrderReferenceSchema).optional(),
  reverseOrderReferences: z.array(PlentyOrderReferenceSchema).optional(),
})

// Item schema
export const PlentyItemSchema = z.object({
  id: z.number(),
  position: z.number().optional(),
  itemType: z.string().optional(),
  stockType: z.number().optional(),
  storeSpecial: z.number().optional(),
  ownerId: z.number().optional(),
  manufacturerId: z.number().optional(),
  mainVariationId: z.number().optional(),
  condition: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  customsTariffNumber: z.string().optional(),
  flagOne: z.number().optional(),
  flagTwo: z.number().optional(),
  free1: z.string().optional(),
  free2: z.string().optional(),
  free3: z.string().optional(),
  free4: z.string().optional(),
  free5: z.string().optional(),
  free6: z.string().optional(),
  free7: z.string().optional(),
  free8: z.string().optional(),
  free9: z.string().optional(),
  free10: z.string().optional(),
  free11: z.string().optional(),
  free12: z.string().optional(),
  free13: z.string().optional(),
  free14: z.string().optional(),
  free15: z.string().optional(),
  free16: z.string().optional(),
  free17: z.string().optional(),
  free18: z.string().optional(),
  free19: z.string().optional(),
  free20: z.string().optional(),
})

// A single sales-price row on a variation, populated only when the variation is
// fetched `with: variationSalesPrices,variationSalesPrices.salesPrice`. The currency
// is either explicit on the row / nested salesPrice, or resolved by looking the
// salesPriceId up against /items/sales_prices/{id}. `price` is the gross amount.
export const PlentyVariationSalesPriceSchema = z.object({
  variationId: z.number().optional(),
  salesPriceId: z.number().optional(),
  price: z.number().optional(),
  currency: z.string().optional(),
  salesPrice: z
    .object({ id: z.number().optional(), currency: z.string().optional() })
    .optional(),
})

// Variation schema
export const PlentyVariationSchema = z.object({
  id: z.number(),
  itemId: z.number().optional(),
  number: z.string().optional(),
  model: z.string().optional(),
  externalId: z.string().optional(),
  isMain: z.boolean().optional(),
  isActive: z.boolean().optional(),
  availability: z.number().optional(),
  purchasePrice: z.number().optional(),
  stockLimitation: z.number().optional(),
  mainWarehouseId: z.number().optional(),
  weightG: z.number().optional(),
  widthMM: z.number().optional(),
  lengthMM: z.number().optional(),
  heightMM: z.number().optional(),
  position: z.number().optional(),
  picking: z.string().optional(),
  variationSalesPrices: z.array(PlentyVariationSalesPriceSchema).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// The distilled per-currency price + availability a catalog resync needs, resolved
// from a variation's sales prices (see getVariationSyncData). Prices are gross
// amounts in currency units (not minor units); a null means Plenty had no price for
// that currency. `availabilityId` maps to a PlentyMarkets availability row.
export const PlentyVariationSyncDataSchema = z.object({
  prices: z.object({
    eur: z.number().nullable(),
    usd: z.number().nullable(),
    gbp: z.number().nullable(),
  }),
  availabilityId: z.number().nullable(),
})

// A PlentyMarkets availability (the "ships in N days" catalog dimension). `names` is
// a language-keyed label map. Fetched from GET /availabilities.
export const PlentyAvailabilitySchema = z.object({
  id: z.number(),
  averageDays: z.number().nullable().optional(),
  names: z.record(z.string(), z.string()).nullable().optional(),
})

// Category schemas
export const PlentyCategoryDetailSchema = z.object({
  categoryId: z.number().optional(),
  lang: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
})

export const PlentyCategorySchema = z.object({
  id: z.number(),
  parentCategoryId: z.number().optional(),
  type: z.string().optional(),
  linklist: z.boolean().optional(),
  right: z.string().optional(),
  sitemap: z.boolean().optional(),
  hasChildren: z.boolean().optional(),
  details: z.array(PlentyCategoryDetailSchema).optional(),
  updatedAt: z.string().optional(),
})

// Stock schema
export const PlentyStockEntrySchema = z.object({
  itemId: z.number().optional(),
  variationId: z.number().optional(),
  warehouseId: z.number().optional(),
  stockPhysical: z.number().optional(),
  reservedStock: z.number().optional(),
  stockNet: z.number().optional(),
  reorderLevel: z.number().optional(),
  updatedAt: z.string().optional(),
})

// Warehouse schema
export const PlentyWarehouseSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  note: z.string().optional(),
  typeId: z.number().optional(),
  priority: z.number().optional(),
  onStockAvailability: z.number().optional(),
  outOfStockAvailability: z.number().optional(),
  splitByShippingProfile: z.boolean().optional(),
  isInventoryModeActive: z.boolean().optional(),
  logisticsType: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Payment schema
export const PlentyPaymentSchema = z.object({
  id: z.number(),
  amount: z.number().optional(),
  exchangeRatio: z.number().optional(),
  parentId: z.number().optional(),
  currency: z.string().optional(),
  type: z.string().optional(),
  status: z.number().optional(),
  transactionType: z.number().optional(),
  mopId: z.number().optional(),
  receivedAt: z.string().optional(),
  importedAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Contact schema
export const PlentyContactSchema = z.object({
  id: z.number(),
  externalId: z.string().optional(),
  number: z.string().optional(),
  typeId: z.number().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  fullName: z.string().optional(),
  email: z.string().optional(),
  gender: z.string().optional(),
  title: z.string().optional(),
  classId: z.number().optional(),
  lang: z.string().optional(),
  referrerId: z.number().optional(),
  plentyId: z.number().optional(),
  rating: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Paginated response schema
export const PlentyPaginatedResponseSchema = <T extends z.ZodType>(
  entrySchema: T
) =>
  z.object({
    page: z.number().optional(),
    totalsCount: z.number().optional(),
    isLastPage: z.boolean().optional(),
    lastPageNumber: z.number().optional(),
    firstOnPage: z.number().optional(),
    lastOnPage: z.number().optional(),
    itemsPerPage: z.number().optional(),
    entries: z.array(entrySchema),
  })

// Type exports
export type PlentyOrderAmount = z.infer<typeof PlentyOrderAmountSchema>
export type PlentyOrderItem = z.infer<typeof PlentyOrderItemSchema>
export type PlentyOrder = z.infer<typeof PlentyOrderSchema>
export type PlentyItem = z.infer<typeof PlentyItemSchema>
export type PlentyVariation = z.infer<typeof PlentyVariationSchema>
export type PlentyVariationSalesPrice = z.infer<
  typeof PlentyVariationSalesPriceSchema
>
export type PlentyVariationSyncData = z.infer<
  typeof PlentyVariationSyncDataSchema
>
export type PlentyAvailability = z.infer<typeof PlentyAvailabilitySchema>
export type PlentyCategoryDetail = z.infer<typeof PlentyCategoryDetailSchema>
export type PlentyCategory = z.infer<typeof PlentyCategorySchema>
export type PlentyStockEntry = z.infer<typeof PlentyStockEntrySchema>
export type PlentyWarehouse = z.infer<typeof PlentyWarehouseSchema>
export type PlentyPayment = z.infer<typeof PlentyPaymentSchema>
export type PlentyContact = z.infer<typeof PlentyContactSchema>
