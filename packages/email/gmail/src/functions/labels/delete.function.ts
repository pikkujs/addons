import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LabelDeleteInput = z.object({
  id: z.string(),
})

export const LabelDeleteOutput = z.object({
  success: z.boolean(),
})

export const labelDelete = pikkuSessionlessFunc({
  description: 'Deletes a label',
  node: { displayName: 'Delete Label', category: 'Labels', type: 'action' },
  input: LabelDeleteInput,
  output: LabelDeleteOutput,
  func: async ({ gmail }, input) => {
    await gmail.request('DELETE', `/users/me/labels/${input.id}`)
    return { success: true }
  },
})
