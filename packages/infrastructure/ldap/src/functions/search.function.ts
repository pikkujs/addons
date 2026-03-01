import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LdapSearchInput = z.object({
  baseDN: z.string().describe('Base DN to search from (e.g. dc=example,dc=org)'),
  filter: z.string().optional().describe('LDAP filter string (e.g. (objectClass=person))'),
  scope: z.enum(['base', 'one', 'sub']).optional().describe('Search scope (default: sub)'),
  attributes: z.array(z.string()).optional().describe('Attributes to return'),
  sizeLimit: z.number().optional().describe('Maximum number of entries to return'),
  timeLimit: z.number().optional().describe('Time limit in seconds'),
})

export const LdapSearchOutput = z.object({
  entries: z.array(z.object({
    dn: z.string(),
    attributes: z.record(z.string(), z.any()),
  })).describe('Search result entries'),
  count: z.number().describe('Number of entries found'),
})

export const ldapSearch = pikkuSessionlessFunc({
  description: 'Search for entries in an LDAP directory',
  input: LdapSearchInput,
  output: LdapSearchOutput,
  node: { displayName: 'LDAP Search', category: 'Infrastructure', type: 'action' },
  func: async ({ ldapClient }, { baseDN, filter, scope, attributes, sizeLimit, timeLimit }) => {
    const { searchEntries } = await ldapClient.search(baseDN, {
      filter: filter ?? '(objectClass=*)',
      scope: scope ?? 'sub',
      attributes,
      sizeLimit,
      timeLimit,
    })

    const entries = searchEntries.map((entry) => {
      const attrs: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(entry)) {
        if (key !== 'dn') {
          attrs[key] = value
        }
      }
      return { dn: entry.dn, attributes: attrs }
    })

    return { entries, count: entries.length }
  },
})
