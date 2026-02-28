import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const ThreadTrashInput = z.object({
  id: z.string(),
})

export const ThreadTrashOutput = z.object({
  id: z.string(),
  historyId: z.string().optional(),
})

export const threadTrash = pikkuSessionlessFunc({
  description: 'Moves a thread to the trash',
  node: { displayName: 'Trash Thread', category: 'Threads', type: 'action' },
  input: ThreadTrashInput,
  output: ThreadTrashOutput,
  func: async ({ gmail }, input) => {
    return gmail.request<z.infer<typeof ThreadTrashOutput>>(
      'POST',
      `/users/me/threads/${input.id}/trash`
    )
  },
})
