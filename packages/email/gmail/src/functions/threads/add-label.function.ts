import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ThreadAddLabelInput = z.object({
  id: z.string(),
  labelIds: z.array(z.string()),
})

export const ThreadAddLabelOutput = z.object({
  id: z.string(),
  historyId: z.string().optional(),
})

export const threadAddLabel = pikkuSessionlessFunc({
  description: 'Adds labels to all messages in a thread',
  node: { displayName: 'Add Label to Thread', category: 'Threads', type: 'action' },
  input: ThreadAddLabelInput,
  output: ThreadAddLabelOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof ThreadAddLabelOutput>>(
      'POST',
      `/users/me/threads/${input.id}/modify`,
      { body: { addLabelIds: input.labelIds } }
    )
  },
})
