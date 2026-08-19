import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { PaymentIntentSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PaymentIntentConfirmInput = z.object({
  paymentIntentId: z.string().describe('The identifier of the payment intent to confirm (pi_...)'),
  paymentMethod: z.string().optional().describe('The payment method to confirm the intent with, if not already attached'),
  returnUrl: z.string().optional().describe('URL to redirect to after any required authentication (3D Secure). Required for redirect-based payment methods'),
  offSession: z.boolean().optional().describe('Set true when confirming a saved card without the customer present'),
})

export const PaymentIntentConfirmOutput = PaymentIntentSchema

export const paymentIntentConfirm = pikkuSessionlessFunc({
  description: 'Confirm a payment intent to run the charge. Use for server-driven confirmation or manual-confirmation flows',
  node: { displayName: 'Confirm Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentConfirmInput,
  output: PaymentIntentConfirmOutput,
  func: async ({ stripe }, { paymentIntentId, ...data }) => {
    const result = await stripe.paymentIntents.confirm(paymentIntentId, {
      ...(data.paymentMethod ? { payment_method: data.paymentMethod } : {}),
      ...(data.returnUrl ? { return_url: data.returnUrl } : {}),
      ...(data.offSession !== undefined ? { off_session: data.offSession } : {}),
    })
    const camel = fromStripeObject(result)
    return PaymentIntentConfirmOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
