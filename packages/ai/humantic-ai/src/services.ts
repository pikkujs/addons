import { HumanticAiService } from './humantic-ai-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('humanticAi')
    if (!cred?.apiKey) {
      throw new Error('Missing humanticAi credential')
    }
    const humanticAi = new HumanticAiService(cred, variables)

    return { humanticAi }
  }
)
