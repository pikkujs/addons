import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MarkAsUnreadInput = z.object({
  mailbox: z.string().default('INBOX').describe('Mailbox containing the email'),
  uids: z.array(z.number()).describe('UIDs of emails to mark as unread'),
})

export const MarkAsUnreadOutput = z.object({
  success: z.boolean(),
  marked: z.number().describe('Number of emails marked as unread'),
})

export const markAsUnread = pikkuSessionlessFunc({
  description: 'Mark one or more emails as unread',
  node: { displayName: 'Mark as Unread', category: 'Email', type: 'action' },
  input: MarkAsUnreadInput,
  output: MarkAsUnreadOutput,
  func: async ({ imap }, { mailbox = 'INBOX', uids }) => {
    return imap.withConnection(async (client) => {
      const lock = await client.getMailboxLock(mailbox)

      try {
        for (const uid of uids) {
          await client.messageFlagsRemove(uid, ['\\Seen'])
        }
        return { success: true, marked: uids.length }
      } finally {
        lock.release()
      }
    })
  },
})
