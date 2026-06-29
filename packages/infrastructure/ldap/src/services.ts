import { Client } from 'ldapts'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => {
  const creds = await secrets.getSecret('LDAP_CREDENTIALS')

  const ldapClient = new Client({
    url: creds.url,
    strictDN: false,
  })

  if (creds.startTLS) {
    await ldapClient.startTLS({})
  }

  await ldapClient.bind(creds.bindDN, creds.bindPassword)

  return {
    ldapClient,
    stop: async () => {
      await ldapClient.unbind()
    },
  }
})
