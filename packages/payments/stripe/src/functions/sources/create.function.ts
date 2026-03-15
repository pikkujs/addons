import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const OwnerSchema = z.object({
  name: z.string().optional().describe('Owner\'s full name'),
  email: z.string().optional().describe('Owner\'s email address'),
  phone: z.string().optional().describe('Owner\'s phone number'),
  address: z.object({
    line1: z.string().optional().describe('Address line 1'),
    line2: z.string().optional().describe('Address line 2'),
    city: z.string().optional().describe('City'),
    state: z.string().optional().describe('State'),
    postal_code: z.string().optional().describe('Postal code'),
    country: z.string().optional().describe('Two-letter country code'),
  }).optional().describe('Owner\'s address'),
})

export const SourceCreateInput = z.object({
  type: z.string().describe('The type of the source to create (e.g., card, bank_account, wechat)'),
  amount: z.number().optional().describe('Amount associated with the source. This is the amount for which the source will be chargeable once ready'),
  currency: z.string().optional().describe('Three-letter ISO code for the currency associated with the source'),
  customer: z.string().optional().describe('The Customer to whom the original source is attached to'),
  owner: OwnerSchema.optional().describe('Information about the owner of the payment instrument'),
  statement_descriptor: z.string().optional().describe('An arbitrary string to be displayed on your customer\'s statement'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to an object'),
  token: z.string().optional().describe('An optional token used to create the source'),
  usage: z.enum(['reusable', 'single_use']).optional().describe('Whether the source should be reusable or single-use'),
})

export const SourceCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('source').describe('String representing the object\'s type'),
  type: z.string().describe('The type of the source'),
  amount: z.number().nullable().describe('Amount associated with the source'),
  currency: z.string().nullable().describe('Three-letter ISO code for the currency'),
  customer: z.string().optional().describe('The ID of the customer to which this source is attached'),
  status: z.string().describe('The status of the source (canceled, chargeable, consumed, failed, or pending)'),
  usage: z.string().describe('Either reusable or single_use'),
  created: z.number().describe('Time at which the object was created'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  metadata: MetadataSchema,
})

type Input = z.infer<typeof SourceCreateInput>
type Output = z.infer<typeof SourceCreateOutput>

export const sourceCreate = pikkuSessionlessFunc({
  description: 'Creates a new source object',
  node: { displayName: 'Create Source', category: 'Sources', type: 'action' },
  input: SourceCreateInput,
  output: SourceCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.sources.create(data as Input) as Output
  },
})
