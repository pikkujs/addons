import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const zapierSecretsSchema = z.object({
  webhookUrls: z.record(z.string(), z.string().url())
    .describe('Map of webhook names to Zapier webhook URLs (e.g., { "userCreated": "https://hooks.zapier.com/hooks/catch/..." })'),
})

export type ZapierSecrets = z.infer<typeof zapierSecretsSchema>

wireSecret({
  name: 'zapier',
  displayName: 'Zapier Webhooks',
  description: 'Zapier webhook URLs for automation triggers',
  secretId: 'ZAPIER_CREDENTIALS',
  schema: zapierSecretsSchema,
})
