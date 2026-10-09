import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { PaymentMethodSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PaymentMethodDetachInput = z.object({
  paymentMethodId: z.string().describe('The identifier of the payment method to detach from its customer (pm_...)'),
})

export const PaymentMethodDetachOutput = PaymentMethodSchema

export const paymentMethodDetach = pikkuSessionlessFunc({
  description: 'Detach a payment method from its customer so it can no longer be charged',
  node: { displayName: 'Detach Payment Method', category: 'Payment Methods', type: 'action' },
  input: PaymentMethodDetachInput,
  output: PaymentMethodDetachOutput,
  func: async ({ stripe }, { paymentMethodId }) => {
    const result = await stripe.paymentMethods.detach(paymentMethodId)
    return PaymentMethodDetachOutput.parse({ ...fromStripeObject(result), created: epochToIso(result.created) })
  },
})
