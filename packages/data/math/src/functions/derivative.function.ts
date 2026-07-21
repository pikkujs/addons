import { z } from 'zod'
import { derivative as mathDerivative } from 'mathjs'
import { pikkuSessionlessFunc } from '#pikku'

export const DerivativeInput = z.object({
  expression: z
    .string()
    .describe('The expression to differentiate, e.g. "2x^2 + 3x + 1"'),
  variable: z
    .string()
    .optional()
    .describe('The variable to differentiate with respect to (default "x")'),
})

export const DerivativeOutput = z.object({
  result: z.string().describe('The symbolic derivative as an expression string'),
})

export const derivative = pikkuSessionlessFunc({
  description:
    'Take the symbolic derivative of an expression with respect to a variable',
  input: DerivativeInput,
  output: DerivativeOutput,
  node: { displayName: 'Derivative', category: 'Math', type: 'action' },
  func: async (_services, { expression, variable }) => {
    return { result: mathDerivative(expression, variable ?? 'x').toString() }
  },
})
