import { UnauthorizedError } from '@pikku/core/errors'
import { GoogleTasksService } from './google-tasks-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('googleTasks')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Google Tasks connection — connect Google Tasks first')
    }
    const googleTasks = new GoogleTasksService(cred, variables)

    return { googleTasks }
  }
)
