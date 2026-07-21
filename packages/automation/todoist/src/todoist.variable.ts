import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const todoistBaseUrlSchema = z.enum(["https://api.todoist.com/rest/v2"]).default("https://api.todoist.com/rest/v2")

wireVariable({
  name: 'TODOIST_BASE_URL',
  displayName: 'Todoist Base URL',
  description: 'The base URL for the Todoist API.',
  variableId: 'TODOIST_BASE_URL',
  schema: todoistBaseUrlSchema,
})
