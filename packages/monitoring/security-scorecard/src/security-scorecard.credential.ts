import { z } from 'zod'
import { wireCredential } from '@pikku/core/credential'

export const securityScorecardCredentialSchema = z.object({
  apiKey: z.string().describe('SecurityScorecard API key'),
})

wireCredential({
  name: 'securityScorecard',
  displayName: 'SecurityScorecard',
  description: 'SecurityScorecard addon',
  type: 'wire',
  schema: securityScorecardCredentialSchema,
})
