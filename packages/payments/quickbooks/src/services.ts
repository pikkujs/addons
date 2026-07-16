import { QuickbooksService } from './quickbooks-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const quickbooks = new QuickbooksService(secrets, variables)

  return { quickbooks }
})
