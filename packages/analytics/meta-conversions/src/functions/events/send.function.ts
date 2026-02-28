import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

const ActionSourceEnum = z.enum([
  'website', 'email', 'app', 'phone_call', 'chat',
  'physical_store', 'system_generated', 'other',
])

const UserDataSchema = z.record(z.string(), z.union([z.string(), z.array(z.string())]))
  .describe('Hashed user data for matching (em, ph, fn, ln, ct, st, zp, country, external_id, client_ip_address, client_user_agent, fbc, fbp)')

const CustomDataSchema = z.record(z.string(), z.unknown())
  .describe('Custom event data (value, currency, content_name, content_ids, contents, num_items, etc.)')

const MetaEventSchema = z.object({
  event_name: z.string().describe('Standard or custom event name (e.g., Purchase, Lead, AddToCart, PageView, ViewContent)'),
  event_time: z.number().describe('Unix timestamp in seconds when the event occurred'),
  event_id: z.string().optional().describe('Unique event ID for deduplication with browser pixel events'),
  event_source_url: z.string().optional().describe('URL where the event occurred'),
  action_source: ActionSourceEnum.describe('Where the conversion occurred'),
  user_data: UserDataSchema,
  custom_data: CustomDataSchema.optional(),
  opt_out: z.boolean().optional().describe('If true, event is used for attribution but not ad delivery optimization'),
})

export const EventSendInput = z.object({
  data: z.array(MetaEventSchema).min(1).describe('Array of server events to send (max 1000 per request)'),
  test_event_code: z.string().optional().describe('Test event code from Events Manager for testing without affecting production data'),
})

export const EventSendOutput = z.object({
  events_received: z.number().describe('Number of events received by Meta'),
  messages: z.array(z.string()).describe('Diagnostic messages from the API'),
  fbtrace_id: z.string().describe('Trace ID for debugging with Meta support'),
})

type Output = z.infer<typeof EventSendOutput>

export const eventSend = pikkuSessionlessFunc({
  description: 'Send server-side conversion events to Meta via the Conversions API',
  node: {
    displayName: 'Send Event',
    category: 'Events',
    type: 'action',
  },
  input: EventSendInput,
  output: EventSendOutput,
  func: async ({ metaConversions }, { data, test_event_code }) => {
    return await metaConversions.sendEvents(data, test_event_code) as Output
  },
})
