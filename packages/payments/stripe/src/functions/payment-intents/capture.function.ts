import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { PaymentIntentSchema } from '../../stripe.types.js'
import { fromStripeObject, epochToIso } from '../../stripe.transform.js'

export const PaymentIntentCaptureInput = z.object({
  paymentIntentId: z.string().describe('The identifier of the payment intent to capture (pi_...). Must be in requires_capture status'),
  amountToCapture: z.number().optional().describe('The amount to capture, in the smallest currency unit, if less than the authorized amount (partial capture). Defaults to the full authorized amount'),
})

export const PaymentIntentCaptureOutput = PaymentIntentSchema

export const paymentIntentCapture = pikkuSessionlessFunc({
  description: 'Capture the funds of a payment intent that was authorized with capture_method=manual (auth-then-capture)',
  node: { displayName: 'Capture Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentCaptureInput,
  output: PaymentIntentCaptureOutput,
  func: async ({ stripe }, { paymentIntentId, amountToCapture }) => {
    const result = await stripe.paymentIntents.capture(
      paymentIntentId,
      amountToCapture !== undefined ? { amount_to_capture: amountToCapture } : undefined,
    )
    const camel = fromStripeObject(result)
    return PaymentIntentCaptureOutput.parse({ ...camel, created: epochToIso(result.created) })
  },
})
