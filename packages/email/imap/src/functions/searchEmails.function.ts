import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const SearchEmailsInput = z.object({
  mailbox: z.string().default('INBOX').describe('Mailbox to search in'),
  unseen: z.boolean().default(true).describe('Search for unseen emails only'),
  from: z.string().optional().describe('Filter by sender'),
  to: z.string().optional().describe('Filter by recipient'),
  subject: z.string().optional().describe('Filter by subject'),
  since: z.string().optional().describe('Emails since date (YYYY-MM-DD)'),
  before: z.string().optional().describe('Emails before date (YYYY-MM-DD)'),
  limit: z.number().default(50).describe('Maximum number of emails to return'),
})

export const SearchEmailsOutput = z.object({
  emails: z.array(z.object({
    uid: z.number(),
    seq: z.number(),
    from: z.string().optional(),
    to: z.string().optional(),
    subject: z.string().optional(),
    date: z.string().optional(),
    flags: z.array(z.string()),
  })),
  total: z.number(),
})

export const searchEmails = pikkuSessionlessFunc({
  description: 'Search for emails in a mailbox',
  node: { displayName: 'Search Emails', category: 'Email', type: 'action' },
  input: SearchEmailsInput,
  output: SearchEmailsOutput,
  func: async ({ imap }, { mailbox = 'INBOX', unseen = true, from, to, subject, since, before, limit = 50 }) => {
    return imap.withConnection(async (client) => {
      const lock = await client.getMailboxLock(mailbox)

      try {
        // Build search query
        const query: Record<string, any> = {}
        if (unseen) query.seen = false
        if (from) query.from = from
        if (to) query.to = to
        if (subject) query.subject = subject
        if (since) query.since = new Date(since)
        if (before) query.before = new Date(before)

        const searchResult = await client.search(query)
        const uids = Array.isArray(searchResult) ? searchResult : []
        const limitedUids = uids.slice(0, limit)

        if (limitedUids.length === 0) {
          return { emails: [], total: 0 }
        }

        const emails: Array<{
          uid: number
          seq: number
          from?: string
          to?: string
          subject?: string
          date?: string
          flags: string[]
        }> = []

        for await (const message of client.fetch(limitedUids, {
          uid: true,
          envelope: true,
          flags: true,
        })) {
          emails.push({
            uid: message.uid,
            seq: message.seq,
            from: message.envelope?.from?.[0]?.address,
            to: message.envelope?.to?.[0]?.address,
            subject: message.envelope?.subject,
            date: message.envelope?.date?.toISOString(),
            flags: Array.from(message.flags || []),
          })
        }

        return { emails, total: emails.length }
      } finally {
        lock.release()
      }
    })
  },
})
