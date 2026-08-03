import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const woocommerceBaseUrlSchema = z.enum(["https://example.com/wp-json/wc/v3"]).default("https://example.com/wp-json/wc/v3")

defineVariable({
  name: 'WOOCOMMERCE_BASE_URL',
  displayName: 'WooCommerce Base URL',
  description: 'The base URL for the WooCommerce API.',
  variableId: 'WOOCOMMERCE_BASE_URL',
  schema: woocommerceBaseUrlSchema,
})
