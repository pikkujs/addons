import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'
import { PaymentIntentSchema } from '../../stripe.types.js'

export const PaymentIntentCaptureInput = z.object({
  paymentIntentId: z.string().describe('The identifier of the payment intent to capture (pi_...). Must be in requires_capture status'),
  amount_to_capture: z.number().optional().describe('The amount to capture, in the smallest currency unit, if less than the authorized amount (partial capture). Defaults to the full authorized amount'),
})

export const PaymentIntentCaptureOutput = PaymentIntentSchema

type Output = z.infer<typeof PaymentIntentCaptureOutput>

export const paymentIntentCapture = pikkuSessionlessFunc({
  description: 'Capture the funds of a payment intent that was authorized with capture_method=manual (auth-then-capture)',
  node: { displayName: 'Capture Payment Intent', category: 'Payment Intents', type: 'action' },
  input: PaymentIntentCaptureInput,
  output: PaymentIntentCaptureOutput,
  func: async ({ stripe }, { paymentIntentId, amount_to_capture }) => {
    return await stripe.paymentIntents.capture(
      paymentIntentId,
      amount_to_capture !== undefined ? { amount_to_capture } : undefined,
    ) as unknown as Output
  },
})
