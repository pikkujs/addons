import { UnauthorizedError } from '@pikku/core/errors'
import { RedditService } from './reddit-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('reddit')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Reddit connection — connect Reddit first')
    }
    const reddit = new RedditService(cred, variables)

    return { reddit }
  }
)
