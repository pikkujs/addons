import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const netlifySecretsSchema = z.object({
  apiKey: z.string().describe('Netlify API key'),
  // Add other secret fields as needed
})

export type NetlifySecrets = z.infer<typeof netlifySecretsSchema>

wireSecret({
  name: 'netlify',
  displayName: 'Netlify API',
  description: 'Web deployment platform',
  secretId: 'NETLIFY_CREDENTIALS',
  schema: netlifySecretsSchema,
})
