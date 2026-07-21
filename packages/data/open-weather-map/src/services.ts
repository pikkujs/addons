import { OpenWeatherMapService } from './open-weather-map-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('openWeatherMap')
    if (!cred?.apiKey) {
      throw new Error('Missing openWeatherMap credential')
    }
    const openWeatherMap = new OpenWeatherMapService(cred, variables)

    return { openWeatherMap }
  }
)
