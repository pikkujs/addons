import { z } from 'zod'
import { defineVariable } from '@pikku/core/variable'

export const securityScorecardBaseUrlSchema = z.enum(["https://api.securityscorecard.io"]).default("https://api.securityscorecard.io")

defineVariable({
  name: 'SECURITY_SCORECARD_BASE_URL',
  displayName: 'SecurityScorecard Base URL',
  description: 'The base URL for the SecurityScorecard API.',
  variableId: 'SECURITY_SCORECARD_BASE_URL',
  schema: securityScorecardBaseUrlSchema,
})
