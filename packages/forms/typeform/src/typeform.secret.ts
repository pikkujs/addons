import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const typeformCredentialsSchema = z.object({
  apiKey: z.string().describe('Typeform personal access token'),
})

export type TypeformCredentials = z.infer<typeof typeformCredentialsSchema>

defineSecret({
  name: 'typeform',
  displayName: 'Typeform API',
  description: 'Form builder',
  secretId: 'TYPEFORM_CREDENTIALS',
  schema: typeformCredentialsSchema,
})
