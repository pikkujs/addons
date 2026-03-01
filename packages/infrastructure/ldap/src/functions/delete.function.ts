import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LdapDeleteInput = z.object({
  dn: z.string().describe('Distinguished name of the entry to delete'),
})

export const LdapDeleteOutput = z.object({
  success: z.boolean().describe('Whether the entry was deleted'),
})

export const ldapDelete = pikkuSessionlessFunc({
  description: 'Delete an entry from an LDAP directory',
  input: LdapDeleteInput,
  output: LdapDeleteOutput,
  node: { displayName: 'LDAP Delete', category: 'Infrastructure', type: 'action' },
  func: async ({ ldapClient }, { dn }) => {
    await ldapClient.del(dn)
    return { success: true }
  },
})
