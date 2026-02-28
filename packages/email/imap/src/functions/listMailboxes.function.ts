import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ListMailboxesInput = z.object({})

const MailboxSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    name: z.string(),
    path: z.string(),
    delimiter: z.string(),
    flags: z.array(z.string()),
    specialUse: z.string().optional(),
  })
)

export const ListMailboxesOutput = z.object({
  mailboxes: z.array(MailboxSchema),
})

export const listMailboxes = pikkuSessionlessFunc({
  description: 'List all mailboxes (folders) in the email account',
  node: { displayName: 'List Mailboxes', category: 'Email', type: 'action' },
  input: ListMailboxesInput,
  output: ListMailboxesOutput,
  func: async ({ imap }) => {
    return imap.withConnection(async (client) => {
      const list = await client.list()

      const mailboxes = list.map((box) => ({
        name: box.name,
        path: box.path,
        delimiter: box.delimiter,
        flags: Array.from(box.flags || []),
        specialUse: box.specialUse,
      }))

      return { mailboxes }
    })
  },
})
