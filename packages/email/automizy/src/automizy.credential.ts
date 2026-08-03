import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const automizyCredentialSchema = z.object({
  token: z.string().describe('Automizy bearer token'),
})

defineCredential({
  name: 'automizy',
  displayName: 'Automizy',
  description: 'Automizy email marketing — contacts and smart lists',
  type: 'wire',
  schema: automizyCredentialSchema,
})
