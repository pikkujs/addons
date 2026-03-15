import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const ChargeListInput = z.object({
  limit: z.number().optional().describe('A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10'),
  customer: z.string().optional().describe('Only return charges for the customer specified by this customer ID'),
  starting_after: z.string().optional().describe('A cursor for use in pagination. starting_after is an object ID that defines your place in the list'),
  ending_before: z.string().optional().describe('A cursor for use in pagination. ending_before is an object ID that defines your place in the list'),
})

export const ChargeItemSchema = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('charge').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount intended to be collected by this payment'),
  amount_captured: z.number().describe('Amount in cents captured'),
  amount_refunded: z.number().describe('Amount in cents refunded'),
  currency: z.string().describe('Three-letter ISO currency code, in lowercase'),
  customer: z.string().nullable().describe('ID of the customer this charge is for if one exists'),
  description: z.string().nullable().describe('An arbitrary string attached to the object'),
  status: z.string().describe('The status of the payment'),
  paid: z.boolean().describe('true if the charge succeeded'),
  refunded: z.boolean().describe('Whether the charge has been fully refunded'),
  created: z.number().describe('Time at which the object was created'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  metadata: MetadataSchema,
})

export const ChargeListOutput = z.object({
  object: z.literal('list').describe('String representing the object\'s type'),
  data: z.array(ChargeItemSchema).describe('An array of charge objects'),
  has_more: z.boolean().describe('True if this list has another page of items after this one that can be fetched'),
  url: z.string().describe('The URL where this list can be accessed'),
})

type Input = z.infer<typeof ChargeListInput>
type Output = z.infer<typeof ChargeListOutput>

export const chargeList = pikkuSessionlessFunc({
  description: 'Returns a list of charges you have previously created',
  node: { displayName: 'List Charges', category: 'Charges', type: 'action' },
  input: ChargeListInput,
  output: ChargeListOutput,
  func: async ({ stripe }, data) => {
    return await stripe.charges.list(data as Input) as Output
  },
})
