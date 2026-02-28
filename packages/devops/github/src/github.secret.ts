import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const githubSecretsSchema = z.object({
  accessToken: z.string().describe('GitHub access token'),
  server: z.string().optional().describe('GitHub server URL (for Enterprise, defaults to https://api.github.com)'),
})

export type GithubSecrets = z.infer<typeof githubSecretsSchema>

wireSecret({
  name: 'github',
  displayName: 'GitHub API',
  description: 'Code hosting platform',
  secretId: 'GITHUB_CREDENTIALS',
  schema: githubSecretsSchema,
})
