import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'

export const ChargeGetInput = z.object({
  chargeId: z.string().describe('The identifier of the charge to retrieve'),
})

export const ChargeGetOutput = z.object({
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
  disputed: z.boolean().describe('Whether the charge has been disputed'),
  captured: z.boolean().describe('If the charge was created without capturing, this Boolean represents whether it is still uncaptured or has since been captured'),
  created: z.number().describe('Time at which the object was created. Measured in seconds since the Unix epoch'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode or the value false if the object exists in test mode'),
  metadata: MetadataSchema,
  receipt_email: z.string().nullable().describe('This is the email address that the receipt for this charge was sent to'),
  receipt_url: z.string().nullable().describe('This is the URL to view the receipt for this charge'),
  failure_code: z.string().nullable().describe('Error code explaining reason for charge failure if available'),
  failure_message: z.string().nullable().describe('Message to user further explaining reason for charge failure if available'),
})

type Output = z.infer<typeof ChargeGetOutput>

export const chargeGet = pikkuSessionlessFunc({
  description: 'Retrieve details of a previously created charge',
  node: { displayName: 'Get Charge', category: 'Charges', type: 'action' },
  input: ChargeGetInput,
  output: ChargeGetOutput,
  func: async ({ stripe }, { chargeId }) => {
    return await stripe.charges.retrieve(chargeId) as Output
  },
})
