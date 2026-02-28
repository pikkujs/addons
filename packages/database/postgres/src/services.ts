import pg from 'pg'
import type { PostgresSecrets } from './postgres.secret.js'
import { pikkuAddonServices } from '#pikku'

export class PostgresService extends pg.Pool {
  async stop() {
    await this.end()
  }
}

export const createSingletonServices = pikkuAddonServices(async (_config, { variables, secrets }) => {
  const params = await variables.getJSON<{ host: string; port: string; database: string; ssl?: string }>('POSTGRES_PARAMS')
  const host = params?.host ?? 'localhost'
  const port = parseInt(params?.port ?? '5432', 10)
  const database = params?.database
  const ssl = params?.ssl === 'true'
  const creds = await secrets.getSecretJSON<PostgresSecrets>('POSTGRES_CREDENTIALS')

  const poolConfig: pg.PoolConfig = {
    host,
    port,
    database,
    user: creds.user,
    password: creds.password,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }

  if (ssl) {
    poolConfig.ssl = {
      rejectUnauthorized: true,
    }
    if (creds.caCertificate) {
      poolConfig.ssl.ca = creds.caCertificate
    }
    if (creds.clientCertificate) {
      poolConfig.ssl.cert = creds.clientCertificate
    }
    if (creds.clientPrivateKey) {
      poolConfig.ssl.key = creds.clientPrivateKey
    }
  }

  const postgres = new PostgresService(poolConfig)

  return { postgres }
})
