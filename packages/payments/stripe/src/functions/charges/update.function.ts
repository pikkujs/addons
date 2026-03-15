import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { AddressSchema, MetadataSchema } from '../../stripe.types.js'

export const ShippingSchema = z.object({
  name: z.string().describe('Recipient name'),
  address: AddressSchema.describe('Shipping address'),
  carrier: z.string().optional().describe('The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.'),
  phone: z.string().optional().describe('Recipient phone (including extension)'),
  tracking_number: z.string().optional().describe('The tracking number for a physical product, obtained from the delivery service'),
})

export const ChargeUpdateInput = z.object({
  chargeId: z.string().describe('The identifier of the charge to update'),
  description: z.string().optional().describe('An arbitrary string which you can attach to a charge object'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to an object'),
  receipt_email: z.string().optional().describe('The email address to which this charge\'s receipt will be sent'),
  shipping: ShippingSchema.optional().describe('Shipping information for the charge. Helps prevent fraud on charges for physical goods'),
  fraud_details: z.object({
    user_report: z.enum(['fraudulent', 'safe']).describe('User-provided fraud report for this charge'),
  }).optional().describe('A set of key-value pairs you can attach to a charge giving information about its riskiness'),
})

export const ChargeUpdateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('charge').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount intended to be collected by this payment'),
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

type Input = z.infer<typeof ChargeUpdateInput>
type Output = z.infer<typeof ChargeUpdateOutput>

export const chargeUpdate = pikkuSessionlessFunc({
  description: 'Updates the specified charge by setting the values of the parameters passed',
  node: { displayName: 'Update Charge', category: 'Charges', type: 'action' },
  input: ChargeUpdateInput,
  output: ChargeUpdateOutput,
  func: async ({ stripe }, data) => {
    const { chargeId, ...params } = data as Input
    return await stripe.charges.update(chargeId, params) as Output
  },
})
