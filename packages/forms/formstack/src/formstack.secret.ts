import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const formstackCredentialsSchema = z.object({
  accessToken: z.string().describe('Formstack OAuth access token'),
})

export type FormstackCredentials = z.infer<typeof formstackCredentialsSchema>

defineSecret({
  name: 'formstack',
  displayName: 'Formstack API',
  description: 'Form builder',
  secretId: 'FORMSTACK_CREDENTIALS',
  schema: formstackCredentialsSchema,
})
