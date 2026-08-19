import { AwsLambdaService } from './aws-lambda-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('awsLambda')
    if (!cred?.apiKey) {
      throw new Error('Missing awsLambda credential')
    }
    const awsLambda = new AwsLambdaService(cred, variables)

    return { awsLambda }
  }
)
