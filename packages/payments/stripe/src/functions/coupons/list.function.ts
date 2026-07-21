import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'
import { toStripeParams, fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const CouponListInput = z.object({
  limit: z.number().optional().describe('A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10'),
  startingAfter: z.string().optional().describe('A cursor for use in pagination. startingAfter is an object ID that defines your place in the list'),
  endingBefore: z.string().optional().describe('A cursor for use in pagination. endingBefore is an object ID that defines your place in the list'),
})

export const CouponItemSchema = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('coupon').describe('String representing the object\'s type'),
  name: z.string().nullable().describe('Name of the coupon displayed to customers'),
  duration: z.string().describe('Describes how long a customer who applies this coupon will get the discount'),
  durationInMonths: z.number().nullable().describe('If duration is repeating, the number of months the coupon applies'),
  amountOff: z.number().nullable().describe('Amount (in cents) that will be taken off the subtotal'),
  currency: z.string().nullable().describe('If amountOff has been set, the three-letter ISO code for the currency'),
  percentOff: z.number().nullable().describe('Percent that will be taken off the subtotal'),
  maxRedemptions: z.number().nullable().describe('Maximum number of times this coupon can be redeemed'),
  timesRedeemed: z.number().describe('Number of times this coupon has been applied to a customer'),
  valid: z.boolean().describe('Whether this coupon can still be applied to a customer'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  metadata: MetadataSchema,
})

export const CouponListOutput = z.object({
  object: z.literal('list').describe('String representing the object\'s type'),
  data: z.array(CouponItemSchema).describe('An array of coupon objects'),
  hasMore: z.boolean().describe('True if this list has another page of items after this one'),
  url: z.string().describe('The URL where this list can be accessed'),
})

export const couponList = pikkuSessionlessFunc({
  description: 'Returns a list of your coupons',
  node: { displayName: 'List Coupons', category: 'Coupons', type: 'action' },
  input: CouponListInput,
  output: CouponListOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.coupons.list(toStripeParams(data))
    return CouponListOutput.parse({
      object: result.object,
      hasMore: result.has_more,
      url: result.url,
      data: result.data.map((coupon) => ({
        ...fromStripeObject(coupon),
        created: epochToIso(coupon.created),
      })),
    })
  },
})
