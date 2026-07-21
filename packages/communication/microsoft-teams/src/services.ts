import { MicrosoftTeamsService } from './microsoft-teams-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets, variables }
) => {
  const microsoftTeams = new MicrosoftTeamsService(secrets, variables)

  return { microsoftTeams }
})
