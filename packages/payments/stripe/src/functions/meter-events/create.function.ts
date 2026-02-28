import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const MeterEventCreateInput = z.object({
  event_name: z.string().describe('The name of the meter event. Corresponds to the event_name field on a meter'),
  payload: z.object({
    stripe_customer_id: z.string().describe('The Stripe customer ID the usage is being reported for'),
    value: z.string().describe('The usage value to report as a numeric string (e.g., "25")'),
  }).describe('The payload of the meter event. Must contain the stripe_customer_id and the event value'),
  identifier: z.string().optional().describe('A unique identifier for the event. If provided, duplicate events with the same identifier within 24 hours will be ignored'),
  timestamp: z.number().optional().describe('The time of the event. Must be within the past 35 calendar days or up to 5 minutes in the future. Defaults to current timestamp. Measured in seconds since the Unix epoch'),
})

export const MeterEventCreateOutput = z.object({
  object: z.literal('billing.meter_event').describe('String representing the object\'s type'),
  event_name: z.string().describe('The name of the meter event'),
  identifier: z.string().describe('A unique identifier for the event'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  payload: z.record(z.string(), z.string()).describe('The payload of the event'),
  timestamp: z.number().describe('The timestamp of the event. Measured in seconds since the Unix epoch'),
  created: z.number().describe('Time at which the object was created. Measured in seconds since the Unix epoch'),
})

type Input = z.infer<typeof MeterEventCreateInput>
type Output = z.infer<typeof MeterEventCreateOutput>

export const meterEventCreate = pikkuSessionlessFunc({
  description: 'Create a meter event to report usage for a customer on a specific meter',
  node: { displayName: 'Create Meter Event', category: 'Meter Events', type: 'action' },
  input: MeterEventCreateInput,
  output: MeterEventCreateOutput,
  func: async ({ stripe }, data) => {
    return await stripe.billing.meterEvents.create(data as Input) as Output
  },
})
