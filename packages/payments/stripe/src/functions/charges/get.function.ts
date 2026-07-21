import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { MetadataSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const ChargeGetInput = z.object({
  chargeId: z.string().describe('The identifier of the charge to retrieve'),
})

export const ChargeGetOutput = z.object({
  id: z.string().describe('Unique identifier for the object'),
  object: z.literal('charge').describe('String representing the object\'s type'),
  amount: z.number().describe('Amount intended to be collected by this payment'),
  amountCaptured: z.number().describe('Amount in cents captured (can be less than the amount attribute on the charge if a partial capture was made)'),
  amountRefunded: z.number().describe('Amount in cents refunded (can be less than the amount attribute on the charge if a partial refund was issued)'),
  currency: z.string().describe('Three-letter ISO currency code, in lowercase'),
  customer: z.string().nullable().describe('ID of the customer this charge is for if one exists'),
  description: z.string().nullable().describe('An arbitrary string attached to the object. Often useful for displaying to users'),
  status: z.string().describe('The status of the payment'),
  paid: z.boolean().describe('true if the charge succeeded, or was successfully authorized for later capture'),
  refunded: z.boolean().describe('Whether the charge has been fully refunded'),
  disputed: z.boolean().describe('Whether the charge has been disputed'),
  captured: z.boolean().describe('If the charge was created without capturing, this Boolean represents whether it is still uncaptured or has since been captured'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode or the value false if the object exists in test mode'),
  metadata: MetadataSchema,
  receiptEmail: z.string().nullable().describe('This is the email address that the receipt for this charge was sent to'),
  receiptUrl: z.string().nullable().describe('This is the URL to view the receipt for this charge'),
  failureCode: z.string().nullable().describe('Error code explaining reason for charge failure if available'),
  failureMessage: z.string().nullable().describe('Message to user further explaining reason for charge failure if available'),
})

export const chargeGet = pikkuSessionlessFunc({
  description: 'Retrieve details of a previously created charge',
  node: { displayName: 'Get Charge', category: 'Charges', type: 'action' },
  input: ChargeGetInput,
  output: ChargeGetOutput,
  func: async ({ stripe }, { chargeId }) => {
    const result = await stripe.charges.retrieve(chargeId)
    const camel = fromStripeObject(result)
    return ChargeGetOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
