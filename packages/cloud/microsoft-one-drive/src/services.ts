import { WebhookSigningSecret } from '@pikku/core/hmac'
import { UnauthorizedError } from '@pikku/core/errors'
import { MicrosoftOneDriveService } from './microsoft-one-drive-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ accessToken: string }>('microsoftOneDrive')
    if (!cred?.accessToken) {
      throw new UnauthorizedError('No Microsoft OneDrive connection — connect Microsoft OneDrive first')
    }
    const microsoftOneDrive = new MicrosoftOneDriveService(cred, variables)

    return { microsoftOneDrive }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => ({
  microsoftOneDriveWebhookSecret: new WebhookSigningSecret(
    'Microsoft OneDrive',
    await secrets
      .getSecret('MICROSOFT_ONE_DRIVE_WEBHOOK_CLIENT_STATE')
      .then((secret) => secret.reveal())
      .catch(() => null)
  ),
}))
