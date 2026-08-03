import { UnauthorizedError } from '@pikku/core/errors'
import { SlackService } from './slack-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('slack')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Slack connection — connect Slack first')
    }
    const slack = new SlackService(cred, variables)

    return { slack }
  }
)
