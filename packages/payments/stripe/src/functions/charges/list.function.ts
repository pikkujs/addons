import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'
import { toStripeParams, fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const ChargeListInput = z.object({
  limit: z.number().optional().describe('A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10'),
  customer: z.string().optional().describe('Only return charges for the customer specified by this customer ID'),
  startingAfter: z.string().optional().describe('A cursor for use in pagination. startingAfter is an object ID that defines your place in the list'),
  endingBefore: z.string().optional().describe('A cursor for use in pagination. endingBefore is an object ID that defines your place in the list'),
})

export const ChargeItemSchema = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('charge').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount intended to be collected by this payment'),
  amountCaptured: z.number().describe('Amount in cents captured'),
  amountRefunded: z.number().describe('Amount in cents refunded'),
  currency: z.string().describe('Three-letter ISO currency code, in lowercase'),
  customer: z.string().nullable().describe('ID of the customer this charge is for if one exists'),
  description: z.string().nullable().describe('An arbitrary string attached to the object'),
  status: z.string().describe('The status of the payment'),
  paid: z.boolean().describe('true if the charge succeeded'),
  refunded: z.boolean().describe('Whether the charge has been fully refunded'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  metadata: MetadataSchema,
})

export const ChargeListOutput = z.object({
  object: z.literal('list').describe('String representing the object\'s type'),
  data: z.array(ChargeItemSchema).describe('An array of charge objects'),
  hasMore: z.boolean().describe('True if this list has another page of items after this one that can be fetched'),
  url: z.string().describe('The URL where this list can be accessed'),
})

export const chargeList = pikkuSessionlessFunc({
  description: 'Returns a list of charges you have previously created',
  node: { displayName: 'List Charges', category: 'Charges', type: 'action' },
  input: ChargeListInput,
  output: ChargeListOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.charges.list(toStripeParams(data))
    return ChargeListOutput.parse({
      object: result.object,
      hasMore: result.has_more,
      url: result.url,
      data: result.data.map((charge) => ({
        ...fromStripeObject(charge),
        created: epochToIso(charge.created),
      })),
    })
  },
})
