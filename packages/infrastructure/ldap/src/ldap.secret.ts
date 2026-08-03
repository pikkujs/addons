import { z } from 'zod'
import { defineSecret } from '@pikku/core/secret'

export const ldapSecretsSchema = z.object({
  url: z.string().describe('LDAP server URL (e.g. ldap://localhost:389)'),
  bindDN: z.string().describe('Bind DN for authentication (e.g. cn=admin,dc=example,dc=org)'),
  bindPassword: z.string().describe('Bind password'),
  startTLS: z.boolean().optional().describe('Use StartTLS for secure connection'),
})

export type LdapSecrets = z.infer<typeof ldapSecretsSchema>

defineSecret({
  name: 'secrets',
  displayName: 'LDAP Credentials',
  description: 'LDAP server connection credentials',
  secretId: 'LDAP_CREDENTIALS',
  schema: ldapSecretsSchema,
})
