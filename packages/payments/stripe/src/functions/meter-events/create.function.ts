import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku/addon/function'
import { epochToIso } from '../../stripe.transform.js'

export const MeterEventCreateInput = z.object({
  eventName: z.string().describe('The name of the meter event. Corresponds to the event_name field on a meter'),
  payload: z.object({
    stripeCustomerId: z.string().describe('The Stripe customer ID the usage is being reported for'),
    value: z.string().describe('The usage value to report as a numeric string (e.g., "25")'),
  }).describe('The payload of the meter event. Must contain the stripeCustomerId and the event value'),
  identifier: z.string().optional().describe('A unique identifier for the event. If provided, duplicate events with the same identifier within 24 hours will be ignored'),
  timestamp: z.number().optional().describe('The time of the event, as epoch seconds. Must be within the past 35 calendar days or up to 5 minutes in the future. Defaults to current timestamp'),
})

export const MeterEventCreateOutput = z.object({
  object: z.literal('billing.meter_event').describe('String representing the object\'s type'),
  eventName: z.string().describe('The name of the meter event'),
  identifier: z.string().describe('A unique identifier for the event'),
  livemode: z.boolean().describe('Has the value true if the object exists in live mode'),
  payload: z.record(z.string(), z.string()).describe('The payload of the event'),
  timestamp: z.string().datetime().describe('The time of the event, as an ISO-8601 string'),
  created: z.string().datetime().describe('Time at which the object was created, as an ISO-8601 string'),
})

export const meterEventCreate = pikkuSessionlessFunc({
  description: 'Create a meter event to report usage for a customer on a specific meter',
  node: { displayName: 'Create Meter Event', category: 'Meter Events', type: 'action' },
  input: MeterEventCreateInput,
  output: MeterEventCreateOutput,
  func: async ({ stripe }, data) => {
    const result = await stripe.billing.meterEvents.create({
      event_name: data.eventName,
      payload: {
        stripe_customer_id: data.payload.stripeCustomerId,
        value: data.payload.value,
      },
      ...(data.identifier ? { identifier: data.identifier } : {}),
      ...(data.timestamp !== undefined ? { timestamp: data.timestamp } : {}),
    })
    return MeterEventCreateOutput.parse({
      object: result.object,
      eventName: result.event_name,
      identifier: result.identifier,
      livemode: result.livemode,
      payload: result.payload,
      timestamp: epochToIso(result.timestamp as unknown as number),
      created: epochToIso(result.created),
    })
  },
})
