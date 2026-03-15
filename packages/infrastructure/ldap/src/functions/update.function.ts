import { z } from 'zod'
import { Change, Attribute } from 'ldapts'
import { pikkuSessionlessFunc } from '#pikku'

export const ChangeSchema = z.object({
  operation: z.enum(['add', 'replace', 'delete']).describe('Type of modification'),
  attribute: z.string().describe('Attribute name'),
  values: z.array(z.string()).optional().describe('Attribute values'),
})

export const LdapUpdateInput = z.object({
  dn: z.string().describe('Distinguished name of the entry to modify'),
  changes: z.array(ChangeSchema).describe('List of changes to apply'),
})

export const LdapUpdateOutput = z.object({
  success: z.boolean().describe('Whether the entry was updated'),
})

export const ldapUpdate = pikkuSessionlessFunc({
  description: 'Modify an existing entry in an LDAP directory',
  input: LdapUpdateInput,
  output: LdapUpdateOutput,
  node: { displayName: 'LDAP Update', category: 'Infrastructure', type: 'action' },
  func: async ({ ldapClient }, { dn, changes }) => {
    const ldapChanges = changes.map(
      (c) => new Change({
        operation: c.operation,
        modification: new Attribute({
          type: c.attribute,
          values: c.values ?? [],
        }),
      })
    )

    await ldapClient.modify(dn, ldapChanges)
    return { success: true }
  },
})
