import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const cratedbBaseUrlSchema = z.enum(["http://localhost:4200"]).default("http://localhost:4200")

defineVariable({
  name: 'CRATEDB_BASE_URL',
  displayName: 'CrateDB Base URL',
  description: 'The base URL for the CrateDB API.',
  variableId: 'CRATEDB_BASE_URL',
  schema: cratedbBaseUrlSchema,
})
