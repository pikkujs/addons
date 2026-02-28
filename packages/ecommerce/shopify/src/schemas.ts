import { z } from 'zod'

// Base schemas
export const ShopifyAddressSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  country: z.string().optional(),
  zip: z.string().optional(),
  phone: z.string().optional(),
})

export const ShopifyVariantSchema = z.object({
  id: z.number().optional(),
  product_id: z.number().optional(),
  title: z.string().optional(),
  price: z.string().optional(),
  sku: z.string().optional(),
  inventory_quantity: z.number().optional(),
  inventory_item_id: z.number().optional(),
})

export const ShopifyImageSchema = z.object({
  id: z.number().optional(),
  src: z.string(),
  alt: z.string().optional(),
  position: z.number().optional(),
})

export const ShopifyProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  body_html: z.string().optional(),
  vendor: z.string().optional(),
  product_type: z.string().optional(),
  handle: z.string().optional(),
  status: z.enum(['active', 'archived', 'draft']).optional(),
  tags: z.string().optional(),
  variants: z.array(ShopifyVariantSchema).optional(),
  images: z.array(ShopifyImageSchema).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export const ShopifyCustomerSchema = z.object({
  id: z.number(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  tags: z.string().optional(),
  note: z.string().optional(),
  addresses: z.array(ShopifyAddressSchema).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export const ShopifyLineItemSchema = z.object({
  id: z.number().optional(),
  product_id: z.number().optional(),
  variant_id: z.number().optional(),
  title: z.string().optional(),
  quantity: z.number().optional(),
  price: z.string().optional(),
  sku: z.string().optional(),
})

export const ShopifyOrderSchema = z.object({
  id: z.number(),
  email: z.string().optional(),
  financial_status: z.string().optional(),
  fulfillment_status: z.string().optional(),
  total_price: z.string().optional(),
  currency: z.string().optional(),
  line_items: z.array(ShopifyLineItemSchema).optional(),
  customer: ShopifyCustomerSchema.optional(),
  shipping_address: ShopifyAddressSchema.optional(),
  billing_address: ShopifyAddressSchema.optional(),
  note: z.string().optional(),
  tags: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
})

export const ShopifyInventoryLevelSchema = z.object({
  inventory_item_id: z.number(),
  location_id: z.number(),
  available: z.number(),
  updated_at: z.string().optional(),
})

// Input schemas
export const CreateProductInputSchema = z.object({
  title: z.string(),
  body_html: z.string().optional(),
  vendor: z.string().optional(),
  product_type: z.string().optional(),
  status: z.enum(['active', 'archived', 'draft']).optional(),
  tags: z.string().optional(),
})

export const UpdateProductInputSchema = z.object({
  title: z.string().optional(),
  body_html: z.string().optional(),
  vendor: z.string().optional(),
  product_type: z.string().optional(),
  status: z.enum(['active', 'archived', 'draft']).optional(),
  tags: z.string().optional(),
})

export const CreateCustomerInputSchema = z.object({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  tags: z.string().optional(),
  note: z.string().optional(),
})

export const UpdateCustomerInputSchema = z.object({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  tags: z.string().optional(),
  note: z.string().optional(),
})

export const CreateOrderInputSchema = z.object({
  line_items: z.array(z.object({
    variant_id: z.number().optional(),
    title: z.string().optional(),
    quantity: z.number(),
    price: z.string().optional(),
  })),
  email: z.string().optional(),
  financial_status: z.enum(['pending', 'authorized', 'partially_paid', 'paid', 'partially_refunded', 'refunded', 'voided']).optional(),
  fulfillment_status: z.enum(['fulfilled', 'partial', 'restocked']).optional(),
  shipping_address: ShopifyAddressSchema.optional(),
  billing_address: ShopifyAddressSchema.optional(),
  note: z.string().optional(),
  tags: z.string().optional(),
  currency: z.string().optional(),
})

export const UpdateOrderInputSchema = z.object({
  note: z.string().optional(),
  tags: z.string().optional(),
  email: z.string().optional(),
})

export const ListProductsParamsSchema = z.object({
  limit: z.number().optional(),
  since_id: z.string().optional(),
  collection_id: z.string().optional(),
})

export const ListOrdersParamsSchema = z.object({
  limit: z.number().optional(),
  status: z.string().optional(),
  since_id: z.string().optional(),
})

export const ListCustomersParamsSchema = z.object({
  limit: z.number().optional(),
  since_id: z.string().optional(),
  query: z.string().optional(),
})

// Type exports
export type ShopifyAddress = z.infer<typeof ShopifyAddressSchema>
export type ShopifyVariant = z.infer<typeof ShopifyVariantSchema>
export type ShopifyImage = z.infer<typeof ShopifyImageSchema>
export type ShopifyProduct = z.infer<typeof ShopifyProductSchema>
export type ShopifyCustomer = z.infer<typeof ShopifyCustomerSchema>
export type ShopifyLineItem = z.infer<typeof ShopifyLineItemSchema>
export type ShopifyOrder = z.infer<typeof ShopifyOrderSchema>
export type ShopifyInventoryLevel = z.infer<typeof ShopifyInventoryLevelSchema>
export type CreateProductInput = z.infer<typeof CreateProductInputSchema>
export type UpdateProductInput = z.infer<typeof UpdateProductInputSchema>
export type CreateCustomerInput = z.infer<typeof CreateCustomerInputSchema>
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerInputSchema>
export type CreateOrderInput = z.infer<typeof CreateOrderInputSchema>
export type UpdateOrderInput = z.infer<typeof UpdateOrderInputSchema>
export type ListProductsParams = z.infer<typeof ListProductsParamsSchema>
export type ListOrdersParams = z.infer<typeof ListOrdersParamsSchema>
export type ListCustomersParams = z.infer<typeof ListCustomersParamsSchema>
