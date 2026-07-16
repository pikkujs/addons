import { MicrosoftToDoService } from './microsoft-to-do-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const microsoftToDo = new MicrosoftToDoService(secrets, variables)

  return { microsoftToDo }
})
