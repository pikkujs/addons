import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const mongodbSecretsSchema = z.object({
  connectionString: z.string().describe('MongoDB connection string (e.g. mongodb://user:pass@host:27017 or mongodb+srv://...)'),
  database: z.string().describe('Database name'),
  caCertificate: z.string().optional().describe('CA certificate for TLS'),
  clientCertificate: z.string().optional().describe('Client certificate for TLS'),
  clientPrivateKey: z.string().optional().describe('Client private key for TLS'),
})

export type MongodbSecrets = z.infer<typeof mongodbSecretsSchema>

wireSecret({
  name: 'secrets',
  displayName: 'MongoDB Secrets',
  description: 'MongoDB connection secrets',
  secretId: 'MONGODB_CREDENTIALS',
  schema: mongodbSecretsSchema,
})
