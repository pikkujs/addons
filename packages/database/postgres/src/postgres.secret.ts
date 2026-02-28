import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const postgresSecretsSchema = z.object({
  user: z.string().describe('Username'),
  password: z.string().describe('Password'),
  caCertificate: z.string().optional().describe('CA Certificate for SSL'),
  clientCertificate: z.string().optional().describe('Client certificate for SSL'),
  clientPrivateKey: z.string().optional().describe('Client private key for SSL'),
})

export type PostgresSecrets = z.infer<typeof postgresSecretsSchema>

wireSecret({
  name: 'secrets',
  displayName: 'PostgreSQL Secrets',
  description: 'PostgreSQL authentication secrets',
  secretId: 'POSTGRES_CREDENTIALS',
  schema: postgresSecretsSchema,
})
