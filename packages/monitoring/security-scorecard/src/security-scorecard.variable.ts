import { z } from 'zod'
import { wireVariable } from '@pikku/core/variable'

export const securityScorecardBaseUrlSchema = z.enum(["https://api.securityscorecard.io"]).default("https://api.securityscorecard.io")

wireVariable({
  name: 'SECURITY_SCORECARD_BASE_URL',
  displayName: 'SecurityScorecard Base URL',
  description: 'The base URL for the SecurityScorecard API.',
  variableId: 'SECURITY_SCORECARD_BASE_URL',
  schema: securityScorecardBaseUrlSchema,
})
