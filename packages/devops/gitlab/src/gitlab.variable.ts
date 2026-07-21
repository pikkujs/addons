import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const gitlabBaseUrlSchema = z.enum(["https://gitlab.com/api/v4"]).default("https://gitlab.com/api/v4")

wireVariable({
  name: 'GITLAB_BASE_URL',
  displayName: 'GitLab Base URL',
  description: 'The base URL for the GitLab API.',
  variableId: 'GITLAB_BASE_URL',
  schema: gitlabBaseUrlSchema,
})
