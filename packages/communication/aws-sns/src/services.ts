import { AwsSnsService } from './aws-sns-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('awsSns')
    if (!cred?.apiKey) {
      throw new Error('Missing awsSns credential')
    }
    const awsSns = new AwsSnsService(cred, variables)

    return { awsSns }
  }
)
