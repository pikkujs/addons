import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageRemoveLabelInput = z.object({
  id: z.string(),
  labelIds: z.array(z.string()),
})

export const MessageRemoveLabelOutput = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()).optional(),
})

export const messageRemoveLabel = pikkuSessionlessFunc({
  description: 'Removes labels from a message',
  node: { displayName: 'Remove Label from Message', category: 'Messages', type: 'action' },
  input: MessageRemoveLabelInput,
  output: MessageRemoveLabelOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof MessageRemoveLabelOutput>>(
      'POST',
      `/users/me/messages/${input.id}/modify`,
      { body: { removeLabelIds: input.labelIds } }
    )
  },
})
