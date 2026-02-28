import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

import { getBodyGraph } from '../lib/humandesign.js'
import { getTransit } from '../lib/transit.js'
import { TransitOutput } from '../human-design.types.js'

export const GetTransitInput = z.object({
  birthDateUtc: z.string().describe('The birth date in UTC as an ISO 8601 string'),
  transitDateUtc: z.string().describe('The transit date in UTC as an ISO 8601 string'),
})

export const getTransitChart = pikkuSessionlessFunc({
  description: 'Generate a transit chart for a given date using Human Design',
  input: GetTransitInput,
  output: TransitOutput,
  node: { displayName: 'Get Transit', category: 'Esoteric', type: 'action' },
  func: async (_services, { birthDateUtc, transitDateUtc }) => {
    const bodyGraph = await getBodyGraph(new Date(birthDateUtc))
    return await getTransit(bodyGraph, new Date(transitDateUtc))
  },
})
