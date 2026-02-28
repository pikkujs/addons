import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const deeplSecretsSchema = z.object({
  apiKey: z.string().describe('DeepL API key'),
  useFreeApi: z.boolean().optional().describe('Use free API endpoint (api-free.deepl.com)'),
})

export type DeeplSecrets = z.infer<typeof deeplSecretsSchema>

wireSecret({
  name: 'deepl',
  displayName: 'DeepL API',
  description: 'AI translation service',
  secretId: 'DEEPL_CREDENTIALS',
  schema: deeplSecretsSchema,
})
