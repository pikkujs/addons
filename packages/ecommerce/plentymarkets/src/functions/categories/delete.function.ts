import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'

export const DeleteCategoryInput = z.object({
  id: z.number().describe('Category ID'),
})

export const DeleteCategoryOutput = z.object({
  success: z.boolean(),
})

type Output = z.infer<typeof DeleteCategoryOutput>

export const deleteCategory = pikkuSessionlessFunc({
  description: 'Delete a category',
  node: {
    displayName: 'Delete Category',
    category: 'Ecommerce',
    type: 'action',
  },
  input: DeleteCategoryInput,
  output: DeleteCategoryOutput,
  func: async ({ plentymarkets }, { id }) => {
    await plentymarkets.deleteCategory(id)
    return { success: true }
  },
})
