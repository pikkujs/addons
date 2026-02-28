import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const paddleSecretsSchema = z.object({
  apiKey: z.string().describe('Paddle API key'),
  sandbox: z.boolean().optional().describe('Use sandbox environment'),
})

export type PaddleSecrets = z.infer<typeof paddleSecretsSchema>

wireSecret({
  name: 'paddle',
  displayName: 'Paddle API',
  description: 'Payments and subscriptions',
  secretId: 'PADDLE_CREDENTIALS',
  schema: paddleSecretsSchema,
})
