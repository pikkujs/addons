import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const DraftDeleteInput = z.object({
  id: z.string(),
})

export const DraftDeleteOutput = z.object({
  success: z.boolean(),
})

export const draftDelete = pikkuSessionlessFunc({
  description: 'Deletes a draft',
  node: { displayName: 'Delete Draft', category: 'Drafts', type: 'action' },
  input: DraftDeleteInput,
  output: DraftDeleteOutput,
  func: async ({ gmail }, input) => {
    await gmail.request('DELETE', `/users/me/drafts/${input.id}`)
    return { success: true }
  },
})
