import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const quickchartBaseUrlSchema = z.enum(["https://quickchart.io"]).default("https://quickchart.io")

wireVariable({
  name: 'QUICKCHART_BASE_URL',
  displayName: 'QuickChart Base URL',
  description: 'The base URL for the QuickChart API.',
  variableId: 'QUICKCHART_BASE_URL',
  schema: quickchartBaseUrlSchema,
})
