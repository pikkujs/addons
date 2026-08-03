import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const mysqlSecretsSchema = z.object({
  user: z.string().describe('Username'),
  password: z.string().describe('Password'),
  caCertificate: z.string().optional().describe('CA Certificate for SSL'),
  clientCertificate: z.string().optional().describe('Client certificate for SSL'),
  clientPrivateKey: z.string().optional().describe('Client private key for SSL'),
})

export type MysqlSecrets = z.infer<typeof mysqlSecretsSchema>

defineSecret({
  name: 'secrets',
  displayName: 'MySQL Secrets',
  description: 'MySQL authentication secrets',
  secretId: 'MYSQL_CREDENTIALS',
  schema: mysqlSecretsSchema,
})
