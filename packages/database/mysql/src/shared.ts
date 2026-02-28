import { z } from 'zod'

export const WhereCondition = z.object({
  column: z.string().describe('Column name'),
  operator: z.enum([
    '=', '!=', '<>',
    'LIKE', 'NOT LIKE',
    '>', '<', '>=', '<=',
    'IS NULL', 'IS NOT NULL',
    'IN', 'NOT IN',
    'BETWEEN'
  ]).describe('Comparison operator'),
  value: z.any().optional().describe('Value to compare against (not needed for IS NULL / IS NOT NULL)'),
  value2: z.any().optional().describe('Second value for BETWEEN operator'),
})

export const WhereClause = z.object({
  conditions: z.array(WhereCondition).optional().describe('Array of WHERE conditions'),
  combineWith: z.enum(['AND', 'OR']).default('AND').optional().describe('How to combine conditions (AND or OR)'),
})

export const OrderByClause = z.object({
  column: z.string().describe('Column to order by'),
  direction: z.enum(['ASC', 'DESC']).default('ASC').optional().describe('Sort direction'),
})

export function escapeIdentifier(identifier: string): string {
  return '`' + identifier.replace(/`/g, '``') + '`'
}

export function buildWhereClause(
  where: z.infer<typeof WhereClause> | undefined
): { clause: string; values: any[] } {
  if (!where?.conditions || where.conditions.length === 0) {
    return { clause: '', values: [] }
  }

  const values: any[] = []
  const combiner = where.combineWith ?? 'AND'

  const parts = where.conditions.map((cond) => {
    const col = escapeIdentifier(cond.column)

    if (cond.operator === 'IS NULL') {
      return `${col} IS NULL`
    }
    if (cond.operator === 'IS NOT NULL') {
      return `${col} IS NOT NULL`
    }
    if (cond.operator === 'IN' || cond.operator === 'NOT IN') {
      const arr = Array.isArray(cond.value) ? cond.value : [cond.value]
      const placeholders = arr.map(() => '?').join(', ')
      values.push(...arr)
      return `${col} ${cond.operator} (${placeholders})`
    }
    if (cond.operator === 'BETWEEN') {
      values.push(cond.value, cond.value2)
      return `${col} BETWEEN ? AND ?`
    }

    values.push(cond.value)
    return `${col} ${cond.operator} ?`
  })

  const clause = ` WHERE ${parts.join(` ${combiner} `)}`
  return { clause, values }
}

export function buildOrderByClause(
  orderBy: z.infer<typeof OrderByClause>[] | undefined
): string {
  if (!orderBy || orderBy.length === 0) {
    return ''
  }

  const parts = orderBy.map((o) => {
    return `${escapeIdentifier(o.column)} ${o.direction ?? 'ASC'}`
  })

  return ` ORDER BY ${parts.join(', ')}`
}
