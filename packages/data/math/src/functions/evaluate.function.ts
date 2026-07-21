import { z } from 'zod'
import { evaluate as mathEvaluate, format } from 'mathjs'
import { pikkuSessionlessFunc } from '#pikku'

export const EvaluateInput = z.object({
  expression: z
    .string()
    .describe(
      'The mathematical expression to evaluate, e.g. "sqrt(3^2 + 4^2)", "cos(45 deg)", "12.7 cm to inch"'
    ),
  scope: z
    .record(z.string(), z.number())
    .optional()
    .describe('Named variables referenced by the expression, e.g. { "x": 3 }'),
})

export const EvaluateOutput = z.object({
  result: z
    .string()
    .describe('The formatted result (handles numbers, units, complex values)'),
  numeric: z
    .number()
    .nullable()
    .describe('The numeric result when it is a plain number, otherwise null'),
})

export const evaluate = pikkuSessionlessFunc({
  description:
    'Evaluate a mathematical expression — arithmetic, trigonometry, units, and functions',
  input: EvaluateInput,
  output: EvaluateOutput,
  node: { displayName: 'Evaluate Expression', category: 'Math', type: 'action' },
  func: async (_services, { expression, scope }) => {
    const value = mathEvaluate(expression, scope ?? {})
    return {
      result: format(value),
      numeric: typeof value === 'number' && Number.isFinite(value) ? value : null,
    }
  },
})
