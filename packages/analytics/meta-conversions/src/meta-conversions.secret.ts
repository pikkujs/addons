import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const metaConversionsSecretsSchema = z.object({
  pixelId: z.string().describe('Meta Pixel ID'),
  accessToken: z.string().describe('Conversions API access token (generated in Events Manager)'),
})

export type MetaConversionsSecrets = z.infer<typeof metaConversionsSecretsSchema>

wireSecret({
  name: 'metaConversions',
  displayName: 'Meta Conversions API',
  description: 'Meta (Facebook) Conversions API for server-side event tracking',
  secretId: 'META_CONVERSIONS_CREDENTIALS',
  schema: metaConversionsSecretsSchema,
})
