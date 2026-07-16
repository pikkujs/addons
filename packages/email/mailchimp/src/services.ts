import { MailchimpService } from './mailchimp-api.service.js'
import { pikkuAddonWireServices } from '#pikku'

export const createWireServices = pikkuAddonWireServices(
  async ({ variables }, wire) => {
    if (!wire.getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const cred = await wire.getCredential<{ apiKey: string }>('mailchimp')
    if (!cred?.apiKey) {
      throw new Error('Missing mailchimp credential')
    }
    const mailchimp = new MailchimpService(cred, variables)

    return { mailchimp }
  }
)
