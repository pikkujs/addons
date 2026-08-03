import { UnauthorizedError } from '@pikku/core/errors'
import { TwitterService } from './twitter-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('twitter')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No X (Twitter) connection — connect X (Twitter) first')
    }
    const twitter = new TwitterService(cred, variables)

    return { twitter }
  }
)
