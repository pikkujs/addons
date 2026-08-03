import { UnauthorizedError } from '@pikku/core/errors'
import { MicrosoftToDoService } from './microsoft-to-do-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('microsoftToDo')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Microsoft To Do connection — connect Microsoft To Do first')
    }
    const microsoftToDo = new MicrosoftToDoService(cred, variables)

    return { microsoftToDo }
  }
)
