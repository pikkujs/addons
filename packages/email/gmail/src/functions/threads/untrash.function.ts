import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ThreadUntrashInput = z.object({
  id: z.string(),
})

export const ThreadUntrashOutput = z.object({
  id: z.string(),
  historyId: z.string().optional(),
})

export const threadUntrash = pikkuSessionlessFunc({
  description: 'Removes a thread from the trash',
  node: { displayName: 'Untrash Thread', category: 'Threads', type: 'action' },
  input: ThreadUntrashInput,
  output: ThreadUntrashOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof ThreadUntrashOutput>>(
      'POST',
      `/users/me/threads/${input.id}/untrash`
    )
  },
})
