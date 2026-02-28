import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const cloudflareSecretsSchema = z.object({
  apiKey: z.string().describe('Cloudflare API key'),
  // Add other secret fields as needed
})

export type CloudflareSecrets = z.infer<typeof cloudflareSecretsSchema>

wireSecret({
  name: 'cloudflare',
  displayName: 'Cloudflare API',
  description: 'Web security and CDN',
  secretId: 'CLOUDFLARE_CREDENTIALS',
  schema: cloudflareSecretsSchema,
})
