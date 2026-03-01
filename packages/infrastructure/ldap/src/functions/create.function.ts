import { z } from 'zod'
import { Attribute } from 'ldapts'
import { pikkuSessionlessFunc } from '#pikku'

export const LdapCreateInput = z.object({
  dn: z.string().describe('Distinguished name of the entry to create'),
  attributes: z.record(z.string(), z.union([z.string(), z.array(z.string())])).describe('Attributes for the new entry'),
})

export const LdapCreateOutput = z.object({
  success: z.boolean().describe('Whether the entry was created'),
  dn: z.string().describe('DN of the created entry'),
})

export const ldapCreate = pikkuSessionlessFunc({
  description: 'Create a new entry in an LDAP directory',
  input: LdapCreateInput,
  output: LdapCreateOutput,
  node: { displayName: 'LDAP Create', category: 'Infrastructure', type: 'action' },
  func: async ({ ldapClient }, { dn, attributes }) => {
    const attrs = Object.entries(attributes).map(
      ([type, values]) => new Attribute({ type, values: Array.isArray(values) ? values : [values] })
    )

    await ldapClient.add(dn, attrs)
    return { success: true, dn }
  },
})
