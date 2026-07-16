import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const phantombusterBaseUrlSchema = z.enum(["https://api.phantombuster.com/api/v2"]).default("https://api.phantombuster.com/api/v2")

wireVariable({
  name: 'PHANTOMBUSTER_BASE_URL',
  displayName: 'Phantombuster Base URL',
  description: 'The base URL for the Phantombuster API.',
  variableId: 'PHANTOMBUSTER_BASE_URL',
  schema: phantombusterBaseUrlSchema,
})
