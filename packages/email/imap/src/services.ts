import { ImapService } from './imap-api.service.js'
import { pikkuAddonServices } from '#pikku/addon/setup'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = (await secrets.getSecret('IMAP_CREDENTIALS')).reveal()
  const imap = new ImapService(creds)

  return { imap }
})
