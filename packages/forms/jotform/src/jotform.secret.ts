import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const jotformCredentialsSchema = z.object({
  apiKey: z.string().describe('JotForm API key'),
})

export type JotformCredentials = z.infer<typeof jotformCredentialsSchema>

wireSecret({
  name: 'jotform',
  displayName: 'JotForm API',
  description: 'Online forms',
  secretId: 'JOTFORM_CREDENTIALS',
  schema: jotformCredentialsSchema,
})
