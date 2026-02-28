import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MarkAsReadInput = z.object({
  mailbox: z.string().default('INBOX').describe('Mailbox containing the email'),
  uids: z.array(z.number()).describe('UIDs of emails to mark as read'),
})

export const MarkAsReadOutput = z.object({
  success: z.boolean(),
  marked: z.number().describe('Number of emails marked as read'),
})

export const markAsRead = pikkuSessionlessFunc({
  description: 'Mark one or more emails as read',
  node: { displayName: 'Mark as Read', category: 'Email', type: 'action' },
  input: MarkAsReadInput,
  output: MarkAsReadOutput,
  func: async ({ imap }, { mailbox = 'INBOX', uids }) => {
    return imap.withConnection(async (client) => {
      const lock = await client.getMailboxLock(mailbox)

      try {
        for (const uid of uids) {
          await client.messageFlagsAdd(uid, ['\\Seen'])
        }
        return { success: true, marked: uids.length }
      } finally {
        lock.release()
      }
    })
  },
})
