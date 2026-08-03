import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const filemakerBaseUrlSchema = z.enum(["https://filemaker.example.com/fmi/data/v1"]).default("https://filemaker.example.com/fmi/data/v1")

defineVariable({
  name: 'FILEMAKER_BASE_URL',
  displayName: 'FileMaker Base URL',
  description: 'The base URL for the FileMaker API.',
  variableId: 'FILEMAKER_BASE_URL',
  schema: filemakerBaseUrlSchema,
})
