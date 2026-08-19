import { ElasticsearchService } from './elasticsearch-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('elasticsearch')
    if (!cred?.apiKey) {
      throw new Error('Missing elasticsearch credential')
    }
    const elasticsearch = new ElasticsearchService(cred, variables)

    return { elasticsearch }
  }
)
