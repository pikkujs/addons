import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const rabbitmqBaseUrlSchema = z.enum(["https://rabbitmq.local"]).default("https://rabbitmq.local")

wireVariable({
  name: 'RABBITMQ_BASE_URL',
  displayName: 'rabbitmq Base URL',
  description: 'The base URL for the rabbitmq API.',
  variableId: 'RABBITMQ_BASE_URL',
  schema: rabbitmqBaseUrlSchema,
})
