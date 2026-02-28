import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const typeformCredentialsSchema = z.object({
  apiKey: z.string().describe('Typeform personal access token'),
})

export type TypeformCredentials = z.infer<typeof typeformCredentialsSchema>

wireSecret({
  name: 'typeform',
  displayName: 'Typeform API',
  description: 'Form builder',
  secretId: 'TYPEFORM_CREDENTIALS',
  schema: typeformCredentialsSchema,
})
