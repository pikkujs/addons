import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const autopilotBaseUrlSchema = z.enum(["https://api2.autopilothq.com/v1"]).default("https://api2.autopilothq.com/v1")

defineVariable({
  name: 'AUTOPILOT_BASE_URL',
  displayName: 'Autopilot Base URL',
  description: 'The base URL for the Autopilot API.',
  variableId: 'AUTOPILOT_BASE_URL',
  schema: autopilotBaseUrlSchema,
})
