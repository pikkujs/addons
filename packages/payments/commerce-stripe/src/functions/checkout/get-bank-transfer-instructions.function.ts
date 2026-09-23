import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { getOwnedStripeResource } from '../../lib/owned-resource.js'
import {
  BankTransferFinancialAddress,
  mapBankTransferInstructions,
} from './create-bank-transfer-intent.function.js'

export const GetBankTransferInstructionsInput = z.object({
  paymentIntentId: z.string(),
})

export const GetBankTransferInstructionsOutput = z.object({
  paymentIntentId: z.string(),
  status: z.string(),
  amountRemainingMinor: z.number().int(),
  currency: z.string(),
  reference: z.string().nullable(),
  financialAddresses: z.array(BankTransferFinancialAddress),
  hostedInstructionsUrl: z.string().nullable(),
})

/**
 * Re-reads a bank-transfer PaymentIntent's instructions (the virtual account and
 * reference can change as funds arrive). Same shape as create's output.
 */
export const getBankTransferInstructions = pikkuSessionlessFunc({
  description: 'Read a bank-transfer PaymentIntent’s funding instructions',
  node: { displayName: 'Get Bank Transfer Instructions', category: 'Checkout', type: 'action' },
  input: GetBankTransferInstructionsInput,
  output: GetBankTransferInstructionsOutput,
  tags: ['addon'],
  func: async ({ stripeApiFor, kysely, paymentOwner }, { paymentIntentId }, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const stripeApi = stripeApiFor(owner?.stripeAccount)
    const intent = await getOwnedStripeResource<Parameters<typeof mapBankTransferInstructions>[0]>(
      stripeApi,
      kysely,
      owner,
      `/payment_intents/${encodeURIComponent(paymentIntentId)}`
    )
    return mapBankTransferInstructions(intent)
  },
})
