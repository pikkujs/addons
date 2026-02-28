import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const LabelCreateInput = z.object({
  name: z.string(),
  labelListVisibility: z
    .enum(['labelShow', 'labelShowIfUnread', 'labelHide'])
    .optional()
    .default('labelShow'),
  messageListVisibility: z.enum(['show', 'hide']).optional().default('show'),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
})

export const LabelCreateOutput = z.object({
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

export const labelCreate = pikkuSessionlessFunc({
  description: 'Creates a new label',
  node: { displayName: 'Create Label', category: 'Labels', type: 'action' },
  input: LabelCreateInput,
  output: LabelCreateOutput,
  func: async ({ gmail }, input) => {
    const body: Record<string, unknown> = {
      name: input.name,
      labelListVisibility: input.labelListVisibility,
      messageListVisibility: input.messageListVisibility,
    }

    if (input.backgroundColor || input.textColor) {
      body.color = {
        backgroundColor: input.backgroundColor,
        textColor: input.textColor,
      }
    }

    return gmail.request<z.infer<typeof LabelCreateOutput>>(
      'POST',
      '/users/me/labels',
      { body }
    )
  },
})
