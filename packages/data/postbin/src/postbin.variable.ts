import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const postbinBaseUrlSchema = z.enum(["https://www.postb.in/api"]).default("https://www.postb.in/api")

defineVariable({
  name: 'POSTBIN_BASE_URL',
  displayName: 'PostBin Base URL',
  description: 'The base URL for the PostBin API.',
  variableId: 'POSTBIN_BASE_URL',
  schema: postbinBaseUrlSchema,
})
