import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const linearBaseUrlSchema = z.enum(["https://api.linear.app"]).default("https://api.linear.app")

defineVariable({
  name: 'LINEAR_BASE_URL',
  displayName: 'Linear Base URL',
  description: 'The base URL for the Linear API.',
  variableId: 'LINEAR_BASE_URL',
  schema: linearBaseUrlSchema,
})
