import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import { ensureCustomer } from '../../lib/customer.js'

export const BankTransferFinancialAddress = z.object({
  type: z.string(),
  iban: z.string().nullable(),
  bic: z.string().nullable(),
  accountHolderName: z.string().nullable(),
})

export const CreateBankTransferIntentInput = z.object({
  amountMinor: z.number().int().positive().describe('Amount to collect, in minor units'),
  currency: z.string().describe('Three-letter ISO currency code, lowercase'),
  country: z
    .string()
    .length(2)
    .describe('ISO country for the virtual account (EU bank transfer)'),
  metadata: z.record(z.string(), z.string()).optional(),
})

export const CreateBankTransferIntentOutput = z.object({
  paymentIntentId: z.string(),
  status: z.string(),
  amountRemainingMinor: z.number().int(),
  currency: z.string(),
  reference: z.string().nullable(),
  financialAddresses: z.array(BankTransferFinancialAddress),
  hostedInstructionsUrl: z.string().nullable(),
})

type StripeIntent = {
  id: string
  status?: string
  amount?: number
  currency?: string
  next_action?: {
    type?: string
    display_bank_transfer_instructions?: {
      amount_remaining?: number
      currency?: string
      reference?: string | null
      hosted_instructions_url?: string | null
      financial_addresses?: Array<{
        type?: string
        iban?: string
        bic?: string
        account_holder_name?: string
      }>
    }
  } | null
}

export const mapBankTransferInstructions = (intent: StripeIntent) => {
  const instructions = intent.next_action?.display_bank_transfer_instructions
  return {
    paymentIntentId: intent.id,
    status: intent.status ?? 'unknown',
    amountRemainingMinor: Number(instructions?.amount_remaining ?? intent.amount ?? 0),
    currency: instructions?.currency ?? intent.currency ?? 'eur',
    reference: instructions?.reference ?? null,
    financialAddresses: (instructions?.financial_addresses ?? []).map((address) => ({
      type: address.type ?? 'unknown',
      iban: address.iban ?? null,
      bic: address.bic ?? null,
      accountHolderName: address.account_holder_name ?? null,
    })),
    hostedInstructionsUrl: instructions?.hosted_instructions_url ?? null,
  }
}

/**
 * A bank-transfer (customer_balance) PaymentIntent: Stripe issues the customer a
 * virtual EU account; the customer pushes the money there and Stripe reconciles
 * it. The caller attaches the PaymentIntent to an invoice so Stripe applies the
 * funds and drives the invoice state.
 */
export const createBankTransferIntent = pikkuSessionlessFunc({
  description: 'Create a customer_balance (EU bank transfer) PaymentIntent for a buyer',
  node: { displayName: 'Create Bank Transfer Intent', category: 'Checkout', type: 'action' },
  input: CreateBankTransferIntentInput,
  output: CreateBankTransferIntentOutput,
  tags: ['addon'],
  func: async ({ stripeApiFor, kysely, paymentOwner }, data, { session }) => {
    const owner = await paymentOwner.resolve(session)
    const stripeApi = stripeApiFor(owner?.stripeAccount)
    const customer = await ensureCustomer(stripeApi, kysely, owner)
    if (!customer) throw new BadRequestError('No buyer to bill for this bank transfer')

    const intent = await stripeApi.post<StripeIntent>('/payment_intents', {
      amount: data.amountMinor,
      currency: data.currency,
      customer: customer.stripeCustomerId,
      payment_method_types: ['customer_balance'],
      payment_method_options: {
        customer_balance: {
          funding_type: 'bank_transfer',
          bank_transfer: {
            type: 'eu_bank_transfer',
            eu_bank_transfer: { country: data.country.toUpperCase() },
          },
        },
      },
      ...(data.metadata ? { metadata: data.metadata } : {}),
    })
    return mapBankTransferInstructions(intent)
  },
})
