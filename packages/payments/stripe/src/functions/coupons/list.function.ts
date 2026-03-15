import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const CouponListInput = z.object({
  limit: z.number().optional().describe('A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10'),
  starting_after: z.string().optional().describe('A cursor for use in pagination. starting_after is an object ID that defines your place in the list'),
  ending_before: z.string().optional().describe('A cursor for use in pagination. ending_before is an object ID that defines your place in the list'),
})

export const CouponItemSchema = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('coupon').describe('String representing the object\'s type'),
  name: z.string().nullable().describe('Name of the coupon displayed to customers'),
  duration: z.string().describe('Describes how long a customer who applies this coupon will get the discount'),
  duration_in_months: z.number().nullable().describe('If duration is repeating, the number of months the coupon applies'),
  amount_off: z.number().nullable().describe('Amount (in cents) that will be taken off the subtotal'),
  currency: z.string().nullable().describe('If amount_off has been set, the three-letter ISO code for the currency'),
  percent_off: z.number().nullable().describe('Percent that will be taken off the subtotal'),
  max_redemptions: z.number().nullable().describe('Maximum number of times this coupon can be redeemed'),
  times_redeemed: z.number().describe('Number of times this coupon has been applied to a customer'),
  valid: z.boolean().describe('Whether this coupon can still be applied to a customer'),
  created: z.number().describe('Time at which the object was created'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  metadata: MetadataSchema,
})

export const CouponListOutput = z.object({
  object: z.literal('list').describe('String representing the object\'s type'),
  data: z.array(CouponItemSchema).describe('An array of coupon objects'),
  has_more: z.boolean().describe('True if this list has another page of items after this one'),
  url: z.string().describe('The URL where this list can be accessed'),
})

type Input = z.infer<typeof CouponListInput>
type Output = z.infer<typeof CouponListOutput>

export const couponList = pikkuSessionlessFunc({
  description: 'Returns a list of your coupons',
  node: { displayName: 'List Coupons', category: 'Coupons', type: 'action' },
  input: CouponListInput,
  output: CouponListOutput,
  func: async ({ stripe }, data) => {
    return await stripe.coupons.list(data as Input) as Output
  },
})
