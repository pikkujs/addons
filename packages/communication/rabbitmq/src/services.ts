import { RabbitmqService } from './rabbitmq-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('rabbitmq')
    if (!cred?.apiKey) {
      throw new Error('Missing rabbitmq credential')
    }
    const rabbitmq = new RabbitmqService(cred, variables)

    return { rabbitmq }
  }
)
