import { GoogleTasksService } from './google-tasks-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const googleTasks = new GoogleTasksService(secrets, variables)

  return { googleTasks }
})
