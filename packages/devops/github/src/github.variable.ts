import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const githubBaseUrlSchema = z.enum(["https://api.github.com"]).default("https://api.github.com")

defineVariable({
  name: 'GITHUB_BASE_URL',
  displayName: 'GitHub Base URL',
  description: 'The base URL for the GitHub API.',
  variableId: 'GITHUB_BASE_URL',
  schema: githubBaseUrlSchema,
})
