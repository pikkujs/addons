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

export const EventValidateInput = z.object({
  client_id: z.string().describe('Client ID that uniquely identifies a user instance'),
  user_id: z.string().optional().describe('User ID to identify the user across devices'),
  timestamp_micros: z.string().optional().describe('Unix timestamp in microseconds for the event'),
  non_personalized_ads: z.boolean().optional().describe('Set to true to indicate events should not be used for personalized ads'),
  user_properties: z.record(z.string(), UserPropertyValueSchema).optional()
    .describe('User properties to set for this user'),
  events: z.array(GA4EventSchema).min(1).describe('Array of events to validate (max 25 per request)'),
})

export const ValidationMessageSchema = z.object({
  fieldPath: z.string().describe('Path to the field that has an issue'),
  description: z.string().describe('Description of the validation issue'),
  validationCode: z.string().describe('Validation error code'),
})

export const EventValidateOutput = z.object({
  validationMessages: z.array(ValidationMessageSchema).describe('Array of validation messages (empty if valid)'),
})

type Output = z.infer<typeof EventValidateOutput>

export const eventValidate = pikkuSessionlessFunc({
  description: 'Validate events against the GA4 Measurement Protocol without sending them',
  node: {
    displayName: 'Validate Event',
    category: 'Events',
    type: 'action',
  },
  input: EventValidateInput,
  output: EventValidateOutput,
  func: async ({ googleAnalytics }, data) => {
    return await googleAnalytics.validateEvents(data) as Output
  },
})
