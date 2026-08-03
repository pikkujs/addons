import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const jenkinsSecretsSchema = z.object({
  username: z.string().describe('Jenkins username'),
  apiKey: z.string().describe('Jenkins personal API token'),
  baseUrl: z.string().describe('Jenkins instance URL'),
})

export type JenkinsSecrets = z.infer<typeof jenkinsSecretsSchema>

defineSecret({
  name: 'jenkins',
  displayName: 'Jenkins API',
  description: 'Automation server for CI/CD',
  secretId: 'JENKINS_CREDENTIALS',
  schema: jenkinsSecretsSchema,
})
