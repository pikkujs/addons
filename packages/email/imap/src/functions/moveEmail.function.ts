import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MoveEmailInput = z.object({
  sourceMailbox: z.string().default('INBOX').describe('Source mailbox'),
  targetMailbox: z.string().describe('Target mailbox to move emails to'),
  uids: z.array(z.number()).describe('UIDs of emails to move'),
})

export const MoveEmailOutput = z.object({
  success: z.boolean(),
  moved: z.number().describe('Number of emails moved'),
})

export const moveEmail = pikkuSessionlessFunc({
  description: 'Move one or more emails to another mailbox',
  node: { displayName: 'Move Email', category: 'Email', type: 'action' },
  input: MoveEmailInput,
  output: MoveEmailOutput,
  func: async ({ imap }, { sourceMailbox = 'INBOX', targetMailbox, uids }) => {
    return imap.withConnection(async (client) => {
      const lock = await client.getMailboxLock(sourceMailbox)

      try {
        for (const uid of uids) {
          await client.messageMove(uid, targetMailbox)
        }
        return { success: true, moved: uids.length }
      } finally {
        lock.release()
      }
    })
  },
})
