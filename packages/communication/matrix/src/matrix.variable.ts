import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const matrixBaseUrlSchema = z.enum(["https://matrix.org/_matrix/client/r0"]).default("https://matrix.org/_matrix/client/r0")

defineVariable({
  name: 'MATRIX_BASE_URL',
  displayName: 'Matrix Base URL',
  description: 'The base URL for the Matrix API.',
  variableId: 'MATRIX_BASE_URL',
  schema: matrixBaseUrlSchema,
})
