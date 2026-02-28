import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LabelGetInput = z.object({
  id: z.string(),
})

export const LabelGetOutput = z.object({
  id: z.string(),
  name: z.string(),
  messageListVisibility: z.string().optional(),
  labelListVisibility: z.string().optional(),
  type: z.string().optional(),
  messagesTotal: z.number().optional(),
  messagesUnread: z.number().optional(),
  threadsTotal: z.number().optional(),
  threadsUnread: z.number().optional(),
  color: z
    .object({
      textColor: z.string().optional(),
      backgroundColor: z.string().optional(),
    })
    .optional(),
})

export const labelGet = pikkuSessionlessFunc({
  description: 'Gets a specific label by ID',
  node: { displayName: 'Get Label', category: 'Labels', type: 'action' },
  input: LabelGetInput,
  output: LabelGetOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof LabelGetOutput>>(
      'GET',
      `/users/me/labels/${input.id}`
    )
  },
})
