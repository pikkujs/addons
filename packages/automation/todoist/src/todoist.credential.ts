import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const todoistCredentialSchema = z.object({
  token: z.string().describe('Todoist bearer token'),
})

wireCredential({
  name: 'todoist',
  displayName: 'Todoist',
  description: 'Todoist integration for Pikku',
  type: 'wire',
  schema: todoistCredentialSchema,
})
