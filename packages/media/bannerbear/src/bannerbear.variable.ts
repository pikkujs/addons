import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const bannerbearBaseUrlSchema = z.enum(["https://api.bannerbear.com/v2"]).default("https://api.bannerbear.com/v2")

wireVariable({
  name: 'BANNERBEAR_BASE_URL',
  displayName: 'Bannerbear Base URL',
  description: 'The base URL for the Bannerbear API.',
  variableId: 'BANNERBEAR_BASE_URL',
  schema: bannerbearBaseUrlSchema,
})
