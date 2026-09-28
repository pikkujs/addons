import { WebhookSigningSecret } from '@pikku/core/hmac'
import { UnauthorizedError } from '@pikku/core/errors'
import { MicrosoftTeamsService } from './microsoft-teams-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

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

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  microsoftTeamsWebhookSecret: new WebhookSigningSecret(
    'Microsoft Teams',
    await secrets
      .getSecret('MICROSOFT_TEAMS_WEBHOOK_CLIENT_STATE')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
