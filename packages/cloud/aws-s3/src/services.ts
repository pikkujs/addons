import { AwsS3Service } from './aws-s3-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('awsS3')
    if (!cred?.apiKey) {
      throw new Error('Missing awsS3 credential')
    }
    const awsS3 = new AwsS3Service(cred, variables)

    return { awsS3 }
  }
)
