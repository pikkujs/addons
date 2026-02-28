import { z } from 'zod'
import { wireSecret } from '@pikku/core/secret'

export const imapSecretsSchema = z.object({
  user: z.string().describe('Email address or username for IMAP login'),
  password: z.string().describe('Password for IMAP login'),
  host: z.string().describe('IMAP server hostname (e.g., imap.gmail.com)'),
  port: z.number().default(993).describe('IMAP server port (993 for SSL/TLS, 143 for STARTTLS)'),
  secure: z.boolean().default(true).describe('Use SSL/TLS connection'),
  allowUnauthorizedCerts: z.boolean().default(false).describe('Allow self-signed certificates'),
})

export type ImapSecrets = z.infer<typeof imapSecretsSchema>

wireSecret({
  name: 'imap',
  displayName: 'IMAP Email',
  description: 'Connect to email servers via IMAP protocol',
  secretId: 'IMAP_CREDENTIALS',
  schema: imapSecretsSchema,
})
