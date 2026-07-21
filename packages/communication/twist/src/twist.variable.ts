import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const twistBaseUrlSchema = z.enum(["https://api.twist.com/api/v3"]).default("https://api.twist.com/api/v3")

wireVariable({
  name: 'TWIST_BASE_URL',
  displayName: 'Twist Base URL',
  description: 'The base URL for the Twist API.',
  variableId: 'TWIST_BASE_URL',
  schema: twistBaseUrlSchema,
})
