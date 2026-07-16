import { TodoistService } from './todoist-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential service unavailable')
    }
    const cred = await wire.getCredential<{ token: string }>('todoist')
    if (!cred?.token) {
      throw new Error('Missing todoist credential')
    }
    const todoist = new TodoistService(cred, variables)

    return { todoist }
  }
)
