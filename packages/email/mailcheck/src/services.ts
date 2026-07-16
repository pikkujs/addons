import { MailcheckService } from './mailcheck-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('mailcheck')
    if (!cred?.apiKey) {
      throw new Error('Missing mailcheck credential')
    }
    const mailcheck = new MailcheckService(cred, variables)

    return { mailcheck }
  }
)
