import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { PaymentIntentSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PaymentIntentGetInput = z.object({
  paymentIntentId: z.string().describe('The identifier of the payment intent to retrieve (pi_...)'),
})

export const PaymentIntentGetOutput = PaymentIntentSchema

export const paymentIntentGet = pikkuSessionlessFunc({
  description: 'Retrieve a payment intent to check its current status (e.g. after a client-side confirmation)',
  node: { displayName: 'Get Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentGetInput,
  output: PaymentIntentGetOutput,
  func: async ({ stripe }, { paymentIntentId }) => {
    const result = await stripe.paymentIntents.retrieve(paymentIntentId)
    const camel = fromStripeObject(result)
    return PaymentIntentGetOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
