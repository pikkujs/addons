import mysql from 'mysql2/promise'
import type { Pool } from 'mysql2/promise'
import type { MysqlSecrets } from './mysql.secret.js'
import { pikkuAddonServices } from '#pikku'

export type MysqlService = Pool & { stop: () => Promise<void> }

export const createSingletonServices = pikkuAddonServices(async (config, { variables, secrets }) => {
  const params = await variables.getJSON<{ host: string; port: string; database: string; ssl?: string }>('MYSQL_PARAMS')
  const host = params?.host ?? 'localhost'
  const port = parseInt(params?.port ?? '3306', 10)
  const database = params?.database
  const ssl = params?.ssl === 'true'
  const creds = await secrets.getSecretJSON<MysqlSecrets>('MYSQL_CREDENTIALS')

  const connectionOptions: mysql.PoolOptions = {
    host,
    port,
    database,
    user: creds.user,
    password: creds.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }

  if (ssl) {
    connectionOptions.ssl = {}
    if (creds.caCertificate) {
      connectionOptions.ssl.ca = creds.caCertificate
    }
    if (creds.clientCertificate) {
      connectionOptions.ssl.cert = creds.clientCertificate
    }
    if (creds.clientPrivateKey) {
      connectionOptions.ssl.key = creds.clientPrivateKey
    }
  }

  const pool = mysql.createPool(connectionOptions)
  const mysqlService = Object.assign(pool, {
    stop: () => pool.end(),
  }) as MysqlService

  return { mysql: mysqlService }
})
