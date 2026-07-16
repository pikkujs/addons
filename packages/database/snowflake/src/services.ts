import { SnowflakeService } from './snowflake-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('snowflake')
    if (!cred?.apiKey) {
      throw new Error('Missing snowflake credential')
    }
    const snowflake = new SnowflakeService(cred, variables)

    return { snowflake }
  }
)
