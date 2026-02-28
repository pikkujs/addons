import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

import { getBodyGraph } from '../lib/humandesign.js'
import { BodygraphOutput } from '../human-design.types.js'

export const GetBodygraphInput = z.object({
  birthDateUtc: z.string().describe('The birth date in UTC as an ISO 8601 string'),
})

export const getBodygraph = pikkuSessionlessFunc({
  description: 'Generate a natal bodygraph from a birth date using Human Design',
  input: GetBodygraphInput,
  output: BodygraphOutput,
  node: { displayName: 'Get Bodygraph', category: 'Esoteric', type: 'action' },
  func: async (_services, { birthDateUtc }) => {
    return await getBodyGraph(new Date(birthDateUtc))
  },
})
