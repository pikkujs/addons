import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const automizyBaseUrlSchema = z.enum(["https://gateway.automizy.com/v2"]).default("https://gateway.automizy.com/v2")

wireVariable({
  name: 'AUTOMIZY_BASE_URL',
  displayName: 'Automizy Base URL',
  description: 'The base URL for the Automizy API.',
  variableId: 'AUTOMIZY_BASE_URL',
  schema: automizyBaseUrlSchema,
})
