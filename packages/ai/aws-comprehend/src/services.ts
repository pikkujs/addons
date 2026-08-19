import { AwsComprehendService } from './aws-comprehend-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('awsComprehend')
    if (!cred?.apiKey) {
      throw new Error('Missing awsComprehend credential')
    }
    const awsComprehend = new AwsComprehendService(cred, variables)

    return { awsComprehend }
  }
)
