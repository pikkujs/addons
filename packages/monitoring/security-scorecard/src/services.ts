import { SecurityScorecardService } from './security-scorecard-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('securityScorecard')
    if (!cred?.apiKey) {
      throw new Error('Missing securityScorecard credential')
    }
    const securityScorecard = new SecurityScorecardService(cred, variables)

    return { securityScorecard }
  }
)
