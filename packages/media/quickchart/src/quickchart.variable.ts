import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const quickchartBaseUrlSchema = z.enum(["https://quickchart.io"]).default("https://quickchart.io")

defineVariable({
  name: 'QUICKCHART_BASE_URL',
  displayName: 'QuickChart Base URL',
  description: 'The base URL for the QuickChart API.',
  variableId: 'QUICKCHART_BASE_URL',
  schema: quickchartBaseUrlSchema,
})
