import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MessageAddLabelInput = z.object({
  id: z.string(),
  labelIds: z.array(z.string()),
})

export const MessageAddLabelOutput = z.object({
  id: z.string(),
  threadId: z.string(),
  labelIds: z.array(z.string()).optional(),
})

export const messageAddLabel = pikkuSessionlessFunc({
  description: 'Adds labels to a message',
  node: { displayName: 'Add Label to Message', category: 'Messages', type: 'action' },
  input: MessageAddLabelInput,
  output: MessageAddLabelOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof MessageAddLabelOutput>>(
      'POST',
      `/users/me/messages/${input.id}/modify`,
      { body: { addLabelIds: input.labelIds } }
    )
  },
})
