import { MongoClient } from 'mongodb'
import type { Db } from 'mongodb'
import { pikkuAddonServices } from '#pikku'

export type MongodbService = Db & { stop: () => Promise<void> }

export const createSingletonServices = pikkuAddonServices(async (_config, { secrets }) => {
  const creds = await secrets.getSecret('MONGODB_CREDENTIALS')

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
  const mongodb = Object.assign(client.db(creds.database), {
    stop: async () => { await client.close() },
  }) as MongodbService

  return {
    mongodb,
  }
})
