import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const SourceGetInput = z.object({
  sourceId: z.string().describe('The identifier of the source to be retrieved'),
})

export const SourceGetOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('source').describe('String representing the object\'s type'),
  type: z.string().describe('The type of the source'),
  amount: z.number().nullable().describe('Amount associated with the source'),
  currency: z.string().nullable().describe('Three-letter ISO code for the currency'),
  customer: z.string().optional().describe('The ID of the customer to which this source is attached'),
  status: z.string().describe('The status of the source'),
  usage: z.string().describe('Either reusable or single_use'),
  created: z.string().datetime().describe('Time at which the object was created'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  metadata: MetadataSchema,
})

export const sourceGet = pikkuSessionlessFunc({
  description: 'Retrieves an existing source object',
  node: { displayName: 'Get Source', category: 'Sources', type: 'action' },
  input: SourceGetInput,
  output: SourceGetOutput,
  func: async ({ stripe }, { sourceId }) => {
    const result = await stripe.sources.retrieve(sourceId)
    const camel = fromStripeObject(result)
    return SourceGetOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
