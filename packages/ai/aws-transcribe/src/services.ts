import { AwsTranscribeService } from './aws-transcribe-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('awsTranscribe')
    if (!cred?.apiKey) {
      throw new Error('Missing awsTranscribe credential')
    }
    const awsTranscribe = new AwsTranscribeService(cred, variables)

    return { awsTranscribe }
  }
)
