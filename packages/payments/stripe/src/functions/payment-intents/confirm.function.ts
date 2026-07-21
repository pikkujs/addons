import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { PaymentIntentSchema } from '../../stripe.types.js'

export const PaymentIntentConfirmInput = z.object({
  paymentIntentId: z.string().describe('The identifier of the payment intent to confirm (pi_...)'),
  payment_method: z.string().optional().describe('The payment method to confirm the intent with, if not already attached'),
  return_url: z.string().optional().describe('URL to redirect to after any required authentication (3D Secure). Required for redirect-based payment methods'),
  off_session: z.boolean().optional().describe('Set true when confirming a saved card without the customer present'),
})

export const PaymentIntentConfirmOutput = PaymentIntentSchema

type Output = z.infer<typeof PaymentIntentConfirmOutput>

export const paymentIntentConfirm = pikkuSessionlessFunc({
  description: 'Confirm a payment intent to run the charge. Use for server-driven confirmation or manual-confirmation flows',
  node: { displayName: 'Confirm Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentConfirmInput,
  output: PaymentIntentConfirmOutput,
  func: async ({ stripe }, { paymentIntentId, ...data }) => {
    return await stripe.paymentIntents.confirm(paymentIntentId, {
      ...(data.payment_method ? { payment_method: data.payment_method } : {}),
      ...(data.return_url ? { return_url: data.return_url } : {}),
      ...(data.off_session !== undefined ? { off_session: data.off_session } : {}),
    }) as unknown as Output
  },
})
