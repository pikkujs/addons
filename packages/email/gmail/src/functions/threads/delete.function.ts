import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ThreadDeleteInput = z.object({
  id: z.string(),
})

export const ThreadDeleteOutput = z.object({
  success: z.boolean(),
})

export const threadDelete = pikkuSessionlessFunc({
  description: 'Immediately and permanently deletes a thread',
  node: { displayName: 'Delete Thread', category: 'Threads', type: 'action' },
  input: ThreadDeleteInput,
  output: ThreadDeleteOutput,
  func: async ({ gmail }, input) => {
    await gmail.request('DELETE', `/users/me/threads/${input.id}`)
    return { success: true }
  },
})
