import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const gSuiteAdminBaseUrlSchema = z.enum(["https://www.googleapis.com/admin"]).default("https://www.googleapis.com/admin")

wireVariable({
  name: 'G_SUITE_ADMIN_BASE_URL',
  displayName: 'Google Workspace Admin Base URL',
  description: 'The base URL for the Google Workspace Admin API.',
  variableId: 'G_SUITE_ADMIN_BASE_URL',
  schema: gSuiteAdminBaseUrlSchema,
})
