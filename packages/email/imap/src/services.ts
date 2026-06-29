import { ImapService } from './imap-api.service.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecret('IMAP_CREDENTIALS')
  const imap = new ImapService(creds)

  return { imap }
})
