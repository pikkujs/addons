import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const postbinBaseUrlSchema = z.enum(["https://www.postb.in/api"]).default("https://www.postb.in/api")

wireVariable({
  name: 'POSTBIN_BASE_URL',
  displayName: 'PostBin Base URL',
  description: 'The base URL for the PostBin API.',
  variableId: 'POSTBIN_BASE_URL',
  schema: postbinBaseUrlSchema,
})
