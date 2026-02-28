import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DeleteEmailInput = z.object({
  mailbox: z.string().default('INBOX').describe('Mailbox containing the email'),
  uids: z.array(z.number()).describe('UIDs of emails to delete'),
})

export const DeleteEmailOutput = z.object({
  success: z.boolean(),
  deleted: z.number().describe('Number of emails deleted'),
})

export const deleteEmail = pikkuSessionlessFunc({
  description: 'Delete one or more emails from a mailbox',
  node: { displayName: 'Delete Email', category: 'Email', type: 'action' },
  input: DeleteEmailInput,
  output: DeleteEmailOutput,
  func: async ({ imap }, { mailbox = 'INBOX', uids }) => {
    return imap.withConnection(async (client) => {
      const lock = await client.getMailboxLock(mailbox)

      try {
        for (const uid of uids) {
          await client.messageDelete(uid)
        }
        return { success: true, deleted: uids.length }
      } finally {
        lock.release()
      }
    })
  },
})
