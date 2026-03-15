import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const GA4EventSchema = z.object({
  name: z.string().describe('Event name (e.g., purchase, page_view, add_to_cart)'),
  params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional()
    .describe('Event parameters as key-value pairs'),
})

export const UserPropertyValueSchema = z.object({
  value: z.union([z.string(), z.number()]).describe('Property value'),
})

export const EventSendInput = z.object({
  client_id: z.string().describe('Client ID that uniquely identifies a user instance (required for web)'),
  user_id: z.string().optional().describe('User ID to identify the user across devices'),
  timestamp_micros: z.string().optional().describe('Unix timestamp in microseconds for the event'),
  non_personalized_ads: z.boolean().optional().describe('Set to true to indicate events should not be used for personalized ads'),
  user_properties: z.record(z.string(), UserPropertyValueSchema).optional()
    .describe('User properties to set for this user'),
  events: z.array(GA4EventSchema).min(1).describe('Array of events to send (max 25 per request)'),
})

export const EventSendOutput = z.object({
  success: z.boolean().describe('Whether the events were sent successfully'),
})

export const eventSend = pikkuSessionlessFunc({
  description: 'Send one or more events to Google Analytics 4 via the Measurement Protocol',
  node: {
    displayName: 'Send Event',
    category: 'Events',
    type: 'action',
  },
  input: EventSendInput,
  output: EventSendOutput,
  func: async ({ googleAnalytics }, data) => {
    await googleAnalytics.sendEvents(data)
    return { success: true }
  },
})
