import { ImapService } from './imap-api.service.js'
import type { ImapSecrets } from './imap.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (
  config,
  { secrets }
) => {
  const creds = await secrets.getSecretJSON<ImapSecrets>('IMAP_CREDENTIALS')
  const imap = new ImapService(creds)

  return { imap }
})
