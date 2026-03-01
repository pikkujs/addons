import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const sshSecretsSchema = z.object({
  host: z.string().describe('SSH server hostname'),
  port: z.number().optional().describe('SSH server port (default 22)'),
  username: z.string().describe('SSH username'),
  password: z.string().optional().describe('SSH password'),
  privateKey: z.string().optional().describe('SSH private key (PEM format)'),
  passphrase: z.string().optional().describe('Passphrase for the private key'),
})

export type SshSecrets = z.infer<typeof sshSecretsSchema>

wireSecret({
  name: 'secrets',
  displayName: 'SSH Credentials',
  description: 'SSH server connection credentials',
  secretId: 'SSH_CREDENTIALS',
  schema: sshSecretsSchema,
})
