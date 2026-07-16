import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const filemakerBaseUrlSchema = z.enum(["https://filemaker.example.com/fmi/data/v1"]).default("https://filemaker.example.com/fmi/data/v1")

wireVariable({
  name: 'FILEMAKER_BASE_URL',
  displayName: 'FileMaker Base URL',
  description: 'The base URL for the FileMaker API.',
  variableId: 'FILEMAKER_BASE_URL',
  schema: filemakerBaseUrlSchema,
})
