import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const CouponCreateInput = z.object({
  id: z.string().optional().describe('Unique string of your choice that will be used to identify this coupon when applying it to a customer'),
  name: z.string().optional().describe('Name of the coupon displayed to customers on, for instance invoices, or receipts'),
  duration: z.enum(['forever', 'once', 'repeating']).optional().describe('Specifies how long the discount will be in effect if used on a subscription. Defaults to once'),
  duration_in_months: z.number().optional().describe('Required only if duration is repeating, in which case it must be a positive integer that specifies the number of months the discount will be in effect'),
  amount_off: z.number().optional().describe('A positive integer representing the amount to subtract from an invoice total (required if percent_off is not passed)'),
  currency: z.string().optional().describe('Three-letter ISO code for the currency of the amount_off parameter (required if amount_off is passed)'),
  percent_off: z.number().optional().describe('A positive float larger than 0, and smaller or equal to 100, that represents the discount the coupon will apply (required if amount_off is not passed)'),
  max_redemptions: z.number().optional().describe('A positive integer specifying the number of times the coupon can be redeemed before it\'s no longer valid'),
  redeem_by: z.number().optional().describe('Unix timestamp specifying the last time at which the coupon can be redeemed'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to an object'),
})

export const CouponCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('coupon').describe('String representing the object\'s type'),
  name: z.string().nullable().describe('Name of the coupon displayed to customers'),
  duration: z.string().describe('Describes how long a customer who applies this coupon will get the discount'),
  duration_in_months: z.number().nullable().describe('If duration is repeating, the number of months the coupon applies'),
  amount_off: z.number().nullable().describe('Amount (in cents) that will be taken off the subtotal'),
  currency: z.string().nullable().describe('If amount_off has been set, the three-letter ISO code for the currency'),
  percent_off: z.number().nullable().describe('Percent that will be taken off the subtotal'),
  max_redemptions: z.number().nullable().describe('Maximum number of times this coupon can be redeemed'),
  redeem_by: z.number().nullable().describe('Date after which the coupon can no longer be redeemed'),
  times_redeemed: z.number().describe('Number of times this coupon has been applied to a customer'),
  valid: z.boolean().describe('Taking account of the above properties, whether this coupon can still be applied to a customer'),
  created: z.number().describe('Time at which the object was created. Measured in seconds since the Unix epoch'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  metadata: MetadataSchema,
})

type Input = z.infer<typeof CouponCreateInput>
type Output = z.infer<typeof CouponCreateOutput>

export const couponCreate = pikkuSessionlessFunc({
  description: 'Create a coupon that can be used to discount invoices or subscriptions',
  node: { displayName: 'Create Coupon', category: 'Coupons', type: 'action' },
  input: CouponCreateInput,
  output: CouponCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.coupons.create(data as Input) as Output
  },
})
