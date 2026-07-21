import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { PaymentIntentSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PaymentIntentCancelInput = z.object({
  paymentIntentId: z.string().describe('The identifier of the payment intent to cancel (pi_...)'),
  cancellationReason: z.enum(['duplicate', 'fraudulent', 'requested_by_customer', 'abandoned']).optional().describe('Reason for cancellation'),
})

export const PaymentIntentCancelOutput = PaymentIntentSchema

export const paymentIntentCancel = pikkuSessionlessFunc({
  description: 'Cancel a payment intent, releasing any uncaptured authorization hold on the customer\'s card',
  node: { displayName: 'Cancel Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentCancelInput,
  output: PaymentIntentCancelOutput,
  func: async ({ stripe }, { paymentIntentId, cancellationReason }) => {
    const result = await stripe.paymentIntents.cancel(
      paymentIntentId,
      cancellationReason ? { cancellation_reason: cancellationReason } : undefined,
    )
    const camel = fromStripeObject(result)
    return PaymentIntentCancelOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
