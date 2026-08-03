import { UnauthorizedError } from '@pikku/core/errors'
import { SpotifyService } from './spotify-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('spotify')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Spotify connection — connect Spotify first')
    }
    const spotify = new SpotifyService(cred, variables)

    return { spotify }
  }
)
