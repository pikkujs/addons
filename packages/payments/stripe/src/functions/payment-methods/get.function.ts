import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { PaymentMethodSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PaymentMethodGetInput = z.object({
  paymentMethodId: z.string().describe('The identifier of the payment method to retrieve (pm_...)'),
})

export const PaymentMethodGetOutput = PaymentMethodSchema

export const paymentMethodGet = pikkuSessionlessFunc({
  description: 'Retrieve a payment method, including the card or SEPA debit details Stripe holds for it',
  node: { displayName: 'Get Payment Method', category: 'Payment Methods', type: 'action' },
  input: PaymentMethodGetInput,
  output: PaymentMethodGetOutput,
  func: async ({ stripe }, { paymentMethodId }) => {
    const result = await stripe.paymentMethods.retrieve(paymentMethodId)
    return PaymentMethodGetOutput.parse({ ...fromStripeObject(result), created: epochToIso(result.created) })
  },
})
