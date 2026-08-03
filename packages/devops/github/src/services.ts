import { UnauthorizedError } from '@pikku/core/errors'
import { GithubService } from './github-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('github')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No GitHub connection — connect GitHub first')
    }
    const github = new GithubService(cred, variables)

    return { github }
  }
)
