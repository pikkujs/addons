import { z } from 'zod'
import { defineCredential } from '@pikku/core/credential'

export const securityScorecardCredentialSchema = z.object({
  apiKey: z.string().describe('SecurityScorecard API key'),
})

defineCredential({
  name: 'securityScorecard',
  displayName: 'SecurityScorecard',
  description: 'SecurityScorecard addon',
  type: 'wire',
  schema: securityScorecardCredentialSchema,
})
