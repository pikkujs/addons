import { UnauthorizedError } from '@pikku/core/errors'
import { StravaService } from './strava-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('strava')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Strava connection — connect Strava first')
    }
    const strava = new StravaService(cred, variables)

    return { strava }
  }
)
