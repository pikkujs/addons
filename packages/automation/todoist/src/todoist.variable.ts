import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const todoistBaseUrlSchema = z.enum(["https://api.todoist.com/rest/v2"]).default("https://api.todoist.com/rest/v2")

defineVariable({
  name: 'TODOIST_BASE_URL',
  displayName: 'Todoist Base URL',
  description: 'The base URL for the Todoist API.',
  variableId: 'TODOIST_BASE_URL',
  schema: todoistBaseUrlSchema,
})
