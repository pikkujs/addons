import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { PaymentIntentSchema } from '../../stripe.types.js'

export const PaymentIntentCancelInput = z.object({
  paymentIntentId: z.string().describe('The identifier of the payment intent to cancel (pi_...)'),
  cancellation_reason: z.enum(['duplicate', 'fraudulent', 'requested_by_customer', 'abandoned']).optional().describe('Reason for cancellation'),
})

export const PaymentIntentCancelOutput = PaymentIntentSchema

type Output = z.infer<typeof PaymentIntentCancelOutput>

export const paymentIntentCancel = pikkuSessionlessFunc({
  description: 'Cancel a payment intent, releasing any uncaptured authorization hold on the customer\'s card',
  node: { displayName: 'Cancel Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentCancelInput,
  output: PaymentIntentCancelOutput,
  func: async ({ stripe }, { paymentIntentId, cancellation_reason }) => {
    return await stripe.paymentIntents.cancel(
      paymentIntentId,
      cancellation_reason ? { cancellation_reason } : undefined,
    ) as unknown as Output
  },
})
