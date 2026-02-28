import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LabelListInput = z.object({})

export const LabelListOutput = z.object({
  labels: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      messageListVisibility: z.string().optional(),
      labelListVisibility: z.string().optional(),
      type: z.string().optional(),
      color: z
        .object({
          textColor: z.string().optional(),
          backgroundColor: z.string().optional(),
        })
        .optional(),
    })
  ),
})

export const labelList = pikkuSessionlessFunc({
  description: 'Lists all labels in the mailbox',
  node: { displayName: 'List Labels', category: 'Labels', type: 'action' },
  input: LabelListInput,
  output: LabelListOutput,
  func: async ({ gmail }) => {
    const result = await gmail.request<{
      labels?: z.infer<typeof LabelListOutput>['labels']
    }>('GET', '/users/me/labels')

    return {
      labels: result.labels || [],
    }
  },
})
