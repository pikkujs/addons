import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const humanticAiBaseUrlSchema = z.enum(["https://api.humantic.ai/v1"]).default("https://api.humantic.ai/v1")

defineVariable({
  name: 'HUMANTIC_AI_BASE_URL',
  displayName: 'Humantic AI Base URL',
  description: 'The base URL for the Humantic AI API.',
  variableId: 'HUMANTIC_AI_BASE_URL',
  schema: humanticAiBaseUrlSchema,
})
