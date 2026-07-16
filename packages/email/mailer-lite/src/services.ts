import { MailerLiteService } from './mailer-lite-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('mailerLite')
    if (!cred?.apiKey) {
      throw new Error('Missing mailerLite credential')
    }
    const mailerLite = new MailerLiteService(cred, variables)

    return { mailerLite }
  }
)
