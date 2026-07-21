import { SalesforceService } from './salesforce-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const salesforce = new SalesforceService(secrets, variables)

  return { salesforce }
})
