import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const trelloBaseUrlSchema = z.enum(["https://api.trello.com/1"]).default("https://api.trello.com/1")

defineVariable({
  name: 'TRELLO_BASE_URL',
  displayName: 'Trello Base URL',
  description: 'The base URL for the Trello API.',
  variableId: 'TRELLO_BASE_URL',
  schema: trelloBaseUrlSchema,
})
