import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const gSuiteAdminBaseUrlSchema = z.enum(["https://www.googleapis.com/admin"]).default("https://www.googleapis.com/admin")

defineVariable({
  name: 'G_SUITE_ADMIN_BASE_URL',
  displayName: 'Google Workspace Admin Base URL',
  description: 'The base URL for the Google Workspace Admin API.',
  variableId: 'G_SUITE_ADMIN_BASE_URL',
  schema: gSuiteAdminBaseUrlSchema,
})
