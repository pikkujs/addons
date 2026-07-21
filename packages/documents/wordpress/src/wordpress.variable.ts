import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const wordpressBaseUrlSchema = z.enum(["https://example-wordpress.com/wp-json/wp/v2"]).default("https://example-wordpress.com/wp-json/wp/v2")

wireVariable({
  name: 'WORDPRESS_BASE_URL',
  displayName: 'WordPress Base URL',
  description: 'The base URL for the WordPress API.',
  variableId: 'WORDPRESS_BASE_URL',
  schema: wordpressBaseUrlSchema,
})
