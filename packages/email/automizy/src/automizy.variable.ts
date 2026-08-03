import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const automizyBaseUrlSchema = z.enum(["https://gateway.automizy.com/v2"]).default("https://gateway.automizy.com/v2")

defineVariable({
  name: 'AUTOMIZY_BASE_URL',
  displayName: 'Automizy Base URL',
  description: 'The base URL for the Automizy API.',
  variableId: 'AUTOMIZY_BASE_URL',
  schema: automizyBaseUrlSchema,
})
