import { MqttService } from './mqtt-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('mqtt')
    if (!cred?.apiKey) {
      throw new Error('Missing mqtt credential')
    }
    const mqtt = new MqttService(cred, variables)

    return { mqtt }
  }
)
