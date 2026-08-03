import { UnauthorizedError } from '@pikku/core/errors'
import { YoutubeService } from './youtube-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('youtube')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No YouTube connection — connect YouTube first')
    }
    const youtube = new YoutubeService(cred, variables)

    return { youtube }
  }
)
