import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ThreadRemoveLabelInput = z.object({
  id: z.string(),
  labelIds: z.array(z.string()),
})

export const ThreadRemoveLabelOutput = z.object({
  id: z.string(),
  historyId: z.string().optional(),
})

export const threadRemoveLabel = pikkuSessionlessFunc({
  description: 'Removes labels from all messages in a thread',
  node: { displayName: 'Remove Label from Thread', category: 'Threads', type: 'action' },
  input: ThreadRemoveLabelInput,
  output: ThreadRemoveLabelOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof ThreadRemoveLabelOutput>>(
      'POST',
      `/users/me/threads/${input.id}/modify`,
      { body: { removeLabelIds: input.labelIds } }
    )
  },
})
