import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const circleciSecretsSchema = z.object({
  apiKey: z.string().describe('CircleCI personal API token'),
})

export type CircleciSecrets = z.infer<typeof circleciSecretsSchema>

wireSecret({
  name: 'circleci',
  displayName: 'CircleCI API',
  description: 'Continuous integration and delivery platform',
  secretId: 'CIRCLECI_CREDENTIALS',
  schema: circleciSecretsSchema,
})
