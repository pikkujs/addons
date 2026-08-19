import { z } from 'zod'
import { simplify as mathSimplify } from 'mathjs'
import { pikkuSessionlessFunc } from '#pikku/addon/function'

export const SimplifyInput = z.object({
  expression: z
    .string()
    .describe('The expression to simplify, e.g. "2x + 3x + x^2 - x^2"'),
})

export const SimplifyOutput = z.object({
  result: z.string().describe('The simplified expression as a string'),
})

export const simplify = pikkuSessionlessFunc({
  description: 'Algebraically simplify a mathematical expression',
  input: SimplifyInput,
  output: SimplifyOutput,
  node: { displayName: 'Simplify', category: 'Math', type: 'action' },
  func: async (_services, { expression }) => {
    return { result: mathSimplify(expression).toString() }
  },
})
