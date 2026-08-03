import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const orbitBaseUrlSchema = z.enum(["https://app.orbit.love/api/v1"]).default("https://app.orbit.love/api/v1")

defineVariable({
  name: 'ORBIT_BASE_URL',
  displayName: 'Orbit Base URL',
  description: 'The base URL for the Orbit API.',
  variableId: 'ORBIT_BASE_URL',
  schema: orbitBaseUrlSchema,
})
