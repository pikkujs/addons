import { AwsSqsService } from './aws-sqs-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('awsSqs')
    if (!cred?.apiKey) {
      throw new Error('Missing awsSqs credential')
    }
    const awsSqs = new AwsSqsService(cred, variables)

    return { awsSqs }
  }
)
