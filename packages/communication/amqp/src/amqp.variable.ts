import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const amqpBaseUrlSchema = z.enum(["https://amqp.local"]).default("https://amqp.local")

wireVariable({
  name: 'AMQP_BASE_URL',
  displayName: 'AMQP Base URL',
  description: 'The base URL for the AMQP API.',
  variableId: 'AMQP_BASE_URL',
  schema: amqpBaseUrlSchema,
})
