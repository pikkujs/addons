import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { AddressSchema, MetadataSchema } from '../../stripe.types.js'

const ShippingSchema = z.object({
  name: z.string().describe('Recipient name'),
  address: AddressSchema.describe('Shipping address'),
  carrier: z.string().optional().describe('The delivery service that shipped a physical product, such as Fedex, UPS, USPS, etc.'),
  phone: z.string().optional().describe('Recipient phone (including extension)'),
  tracking_number: z.string().optional().describe('The tracking number for a physical product, obtained from the delivery service'),
})

export const ChargeCreateInput = z.object({
  amount: z.number().optional().describe('Amount intended to be collected by this payment. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00)'),
  currency: z.string().optional().describe('Three-letter ISO currency code, in lowercase. Must be a supported currency'),
  customer: z.string().optional().describe('The ID of an existing customer that will be charged in this request'),
  source: z.string().optional().describe('A payment source to be charged. This can be the ID of a card, bank account, source, token, or connected account'),
  description: z.string().optional().describe('An arbitrary string which you can attach to a Charge object. It is displayed when in the web interface alongside the charge'),
  metadata: MetadataSchema.optional().describe('Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format'),
  receipt_email: z.string().optional().describe('The email address to which this charge\'s receipt will be sent. The receipt will not be sent until the charge is paid'),
  shipping: ShippingSchema.optional().describe('Shipping information for the charge. Helps prevent fraud on charges for physical goods'),
  capture: z.boolean().optional().describe('Whether to immediately capture the charge. Defaults to true. When false, the charge issues an authorization (or pre-authorization)'),
  statement_descriptor: z.string().optional().describe('For a non-card charge, text that appears on the customer\'s statement as the statement descriptor'),
  statement_descriptor_suffix: z.string().optional().describe('Provides information about a card charge. Concatenated to the account\'s statement descriptor prefix'),
})

export const ChargeCreateOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('charge').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount intended to be collected by this payment'),
  amount_captured: z.number().describe('Amount in cents captured (can be less than the amount attribute on the charge if a partial capture was made)'),
  amount_refunded: z.number().describe('Amount in cents refunded (can be less than the amount attribute on the charge if a partial refund was issued)'),
  currency: z.string().describe('Three-letter ISO currency code, in lowercase'),
  customer: z.string().nullable().describe('ID of the customer this charge is for if one exists'),
  description: z.string().nullable().describe('An arbitrary string attached to the object. Often useful for displaying to users'),
  status: z.string().describe('The status of the payment'),
  paid: z.boolean().describe('true if the charge succeeded, or was successfully authorized for later capture'),
  refunded: z.boolean().describe('Whether the charge has been fully refunded'),
  captured: z.boolean().describe('If the charge was created without capturing, this Boolean represents whether it is still uncaptured or has since been captured'),
  created: z.number().describe('Time at which the object was created. Measured in seconds since the Unix epoch'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode or the value false if the object exists in test mode'),
  metadata: MetadataSchema,
  receipt_email: z.string().nullable().describe('This is the email address that the receipt for this charge was sent to'),
  receipt_url: z.string().nullable().describe('This is the URL to view the receipt for this charge'),
})

type Input = z.infer<typeof ChargeCreateInput>
type Output = z.infer<typeof ChargeCreateOutput>

export const chargeCreate = pikkuSessionlessFunc({
  description: 'Create a charge to move money into your Stripe account',
  node: { displayName: 'Create Charge', category: 'Charges', type: 'action' },
  input: ChargeCreateInput,
  output: ChargeCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.charges.create(data as Input) as Output
  },
})
