import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const jiraBaseUrlSchema = z.enum(["https://your-domain.atlassian.net"]).default("https://your-domain.atlassian.net")

defineVariable({
  name: 'JIRA_BASE_URL',
  displayName: 'Jira Base URL',
  description: 'The base URL for the Jira API.',
  variableId: 'JIRA_BASE_URL',
  schema: jiraBaseUrlSchema,
})
