import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const trelloCredentialSchema = z.object({
  apiKey: z.string().describe('Trello API key'),
})

wireCredential({
  name: 'trello',
  displayName: 'Trello',
  description: 'Create, change and delete Trello boards, cards, lists and more',
  type: 'wire',
  schema: trelloCredentialSchema,
})
