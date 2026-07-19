import { z } from 'zod'

import { pikkuSessionlessFunc } from '#pikku'
import { PlentyAvailabilitySchema } from '../../schemas.js'

export const ListAvailabilitiesInput = z.void()

export const ListAvailabilitiesOutput = z.object({
  entries: z.array(PlentyAvailabilitySchema),
})

export const listAvailabilities = pikkuSessionlessFunc({
  description:
    'List the PlentyMarkets availabilities (the "ships in N days" catalog dimension) — GET /availabilities.',
  node: {
    displayName: 'List Availabilities',
    category: 'Ecommerce',
    type: 'action',
  },
  input: ListAvailabilitiesInput,
  output: ListAvailabilitiesOutput,
  func: async ({ plentymarkets }) => {
    return { entries: await plentymarkets.listAvailabilities() }
  },
})
