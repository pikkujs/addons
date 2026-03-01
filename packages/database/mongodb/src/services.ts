import { MongoClient } from 'mongodb'
import type { MongodbSecrets } from './mongodb.secret.js'
import { pikkuAddonServices } from '#pikku'

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => {
  const creds = await secrets.getSecretJSON<MongodbSecrets>('MONGODB_CREDENTIALS')

  const tlsOptions: Record<string, unknown> = {}
  if (creds.caCertificate) {
    tlsOptions.tls = true
    tlsOptions.tlsCAFile = creds.caCertificate
  }
  if (creds.clientCertificate) {
    tlsOptions.tlsCertificateKeyFile = creds.clientCertificate
  }

  const client = new MongoClient(creds.connectionString, tlsOptions)
  await client.connect()
  const mongodb = client.db(creds.database)

  return {
    mongodb,
    stop: async () => { await client.close() },
  }
})
