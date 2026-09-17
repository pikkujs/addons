import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { BadRequestError } from '@pikku/core/errors'
import { ensureCustomer } from '../../lib/customer.js'

export const CreateInstallmentScheduleInput = z.object({
  amountMinor: z.number().int().nonnegative().describe('Total to collect across the installments'),
  currency: z.string().describe('Three-letter ISO currency code, lowercase'),
  installments: z.number().int().min(2).max(12).describe('Number of installments'),
  downPaymentPercent: z
    .number()
    .int()
    .min(1)
    .max(99)
    .optional()
    .describe('Makes the first installment this percentage of the total'),
  deferredDays: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .describe('Days before the first installment is charged'),
  metadata: z.record(z.string(), z.string()).optional(),
})

export const CreateInstallmentScheduleOutput = z.object({
  scheduleId: z.string(),
  installments: z.number().int(),
  totalMinor: z.number().int(),
  firstAmountMinor: z.number().int(),
  perInstallmentMinor: z.number().int(),
})

type StripePrice = { id: string }
type StripeSchedule = { id: string }

/**
 * An installment plan as a Stripe subscription schedule: N monthly iterations
 * then cancel. Stripe generates each installment invoice; the caller only
 * supplies the total and the split. A down payment makes the first iteration
 * larger; the remainder is spread over the rest. The addon resolves the buyer
 * from the session owner, so the plan rides the company's Stripe customer.
 */
export const createInstallmentSchedule = pikkuSessionlessFunc({
  description: 'Create a Stripe subscription-schedule installment plan for a total amount',
  node: { displayName: 'Create Installment Schedule', category: 'Checkout', type: 'action' },
  input: CreateInstallmentScheduleInput,
  output: CreateInstallmentScheduleOutput,
  tags: ['addon'],
  func: async ({ stripeApiFor, kysely, paymentOwner }, data, { session }) => {
    if (data.installments < 2) throw new BadRequestError('An installment plan needs at least two payments')
    const owner = await paymentOwner.resolve(session)
    const stripeApi = stripeApiFor(owner?.stripeAccount)
    const customer = await ensureCustomer(stripeApi, kysely, owner)
    if (!customer) throw new BadRequestError('No buyer to bill for this installment plan')

    const totalMinor = data.amountMinor
    const restIterations = data.installments - 1
    let firstAmountMinor: number
    let perInstallmentMinor: number
    if (data.downPaymentPercent) {
      const down = Math.round((totalMinor * data.downPaymentPercent) / 100)
      const remaining = totalMinor - down
      perInstallmentMinor = Math.floor(remaining / restIterations)
      firstAmountMinor = down + (remaining - perInstallmentMinor * restIterations)
    } else {
      perInstallmentMinor = Math.floor(totalMinor / data.installments)
      firstAmountMinor = perInstallmentMinor + (totalMinor - perInstallmentMinor * data.installments)
    }

    const priceFor = async (amountMinor: number): Promise<string> => {
      const price = await stripeApi.post<StripePrice>('/prices', {
        currency: data.currency,
        unit_amount: amountMinor,
        recurring: { interval: 'month' },
        product_data: { name: 'Installment plan' },
      })
      return price.id
    }

    const firstPrice = await priceFor(firstAmountMinor)
    const basePrice = await priceFor(perInstallmentMinor)
    const startDate =
      data.deferredDays && data.deferredDays > 0
        ? Math.floor(Date.now() / 1000) + data.deferredDays * 24 * 60 * 60
        : undefined

    const schedule = await stripeApi.post<StripeSchedule>('/subscription_schedules', {
      customer: customer.stripeCustomerId,
      end_behavior: 'cancel',
      ...(data.metadata ? { metadata: data.metadata } : {}),
      ...(startDate ? { start_date: startDate } : {}),
      phases: [
        {
          items: [{ price: firstPrice, quantity: 1 }],
          iterations: 1,
          ...(data.metadata ? { metadata: data.metadata } : {}),
        },
        {
          items: [{ price: basePrice, quantity: 1 }],
          iterations: restIterations,
          ...(data.metadata ? { metadata: data.metadata } : {}),
        },
      ],
    })

    return {
      scheduleId: schedule.id,
      installments: data.installments,
      totalMinor,
      firstAmountMinor,
      perInstallmentMinor,
    }
  },
})
