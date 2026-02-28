import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const gitlabSecretsSchema = z.object({
  accessToken: z.string().describe('GitLab personal access token'),
  server: z.string().optional().describe('GitLab server URL (defaults to https://gitlab.com)'),
})

export type GitlabSecrets = z.infer<typeof gitlabSecretsSchema>

wireSecret({
  name: 'gitlab',
  displayName: 'GitLab API',
  description: 'DevOps platform for version control and CI/CD',
  secretId: 'GITLAB_CREDENTIALS',
  schema: gitlabSecretsSchema,
})
