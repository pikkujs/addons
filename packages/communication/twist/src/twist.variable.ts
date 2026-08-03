import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const twistBaseUrlSchema = z.enum(["https://api.twist.com/api/v3"]).default("https://api.twist.com/api/v3")

defineVariable({
  name: 'TWIST_BASE_URL',
  displayName: 'Twist Base URL',
  description: 'The base URL for the Twist API.',
  variableId: 'TWIST_BASE_URL',
  schema: twistBaseUrlSchema,
})
