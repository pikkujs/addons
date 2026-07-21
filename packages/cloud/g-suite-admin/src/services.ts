import { GSuiteAdminService } from './g-suite-admin-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const gSuiteAdmin = new GSuiteAdminService(secrets, variables)

  return { gSuiteAdmin }
})
