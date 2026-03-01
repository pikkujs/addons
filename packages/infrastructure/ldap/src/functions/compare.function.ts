import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LdapCompareInput = z.object({
  dn: z.string().describe('Distinguished name of the entry to compare'),
  attribute: z.string().describe('Attribute name to compare'),
  value: z.string().describe('Value to compare against'),
})

export const LdapCompareOutput = z.object({
  match: z.boolean().describe('Whether the attribute value matches'),
})

export const ldapCompare = pikkuSessionlessFunc({
  description: 'Compare an attribute value in an LDAP entry',
  input: LdapCompareInput,
  output: LdapCompareOutput,
  node: { displayName: 'LDAP Compare', category: 'Infrastructure', type: 'action' },
  func: async ({ ldapClient }, { dn, attribute, value }) => {
    const match = await ldapClient.compare(dn, attribute, value)
    return { match }
  },
})
