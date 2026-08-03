import { UnauthorizedError } from '@pikku/core/errors'
import { MicrosoftTeamsService } from './microsoft-teams-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('microsoftTeams')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Microsoft Teams connection — connect Microsoft Teams first')
    }
    const microsoftTeams = new MicrosoftTeamsService(cred, variables)

    return { microsoftTeams }
  }
)
