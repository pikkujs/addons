import { WebhookSigningSecret } from '@pikku/core/hmac'
import { JiraService } from './jira-api.service.js'
import { pikkuAddonServices, pikkuAddonWireServices } from '#pikku/addon/setup'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential service unavailable')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('jira')
    if (!cred?.apiKey) {
      throw new Error('Missing jira credential')
    }
    const jira = new JiraService(cred, variables)

    return { jira }
  }
)

export const createSingletonServices = pikkuAddonServices(async (_config, { credentialService }) => ({
  jiraWebhookSecret: WebhookSigningSecret.fromCredential(
    'Jira',
    credentialService,
    'jiraWebhookSecret'
  ),
}))
