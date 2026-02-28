import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const bitbucketSecretsSchema = z.object({
  username: z.string().describe('Bitbucket username'),
  appPassword: z.string().describe('Bitbucket app password'),
})

export type BitbucketSecrets = z.infer<typeof bitbucketSecretsSchema>

wireSecret({
  name: 'bitbucket',
  displayName: 'Bitbucket API',
  description: 'Git hosting',
  secretId: 'BITBUCKET_CREDENTIALS',
  schema: bitbucketSecretsSchema,
})
