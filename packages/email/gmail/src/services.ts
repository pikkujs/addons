import { GmailService } from './gmail-api.service.js'
import { pikkuAddonWireServices } from '#pikku/addon/setup'

/**
 * Built per wire rather than once per deployment, because `gmailOAuth` may be
 * either a single team mailbox or one account per user — the wiring decides,
 * and only the wire knows whose request this is.
 */
export const createWireServices = pikkuAddonWireServices(
  async (_services, wire) => {
    const getCredential = wire.getCredential
    if (!getCredential) {
      throw new Error('Credential resolution is not available in this runtime')
    }
    const gmail = new GmailService({ getCredential })

    return { gmail }
  }
)
