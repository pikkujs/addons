import { z } from 'zod'
import { pikkuSessionlessFunc } from '#pikku'

export const CallMakeInput = z.object({
  From: z.string().describe('The phone number to use as the caller ID in E.164 format'),
  To: z.string().describe('The phone number to call in E.164 format'),
  Message: z.string().describe('The message to speak or TwiML instructions'),
  useTwiml: z.boolean().optional().describe('Whether the message is TwiML markup (otherwise plain text is wrapped in <Say>)'),
  StatusCallback: z.string().optional().describe('URL to send status callbacks to'),
})

export const CallMakeOutput = z.object({
  sid: z.string().describe('The unique identifier for this call'),
  date_created: z.string().describe('The date this resource was created'),
  status: z.string().describe('The status of the call'),
  from: z.string().describe('The phone number that initiated the call'),
  to: z.string().describe('The phone number that received the call'),
  direction: z.string().describe('The direction of the call'),
})

type Output = z.infer<typeof CallMakeOutput>

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export const callMake = pikkuSessionlessFunc({
  description: 'Make a voice call with a spoken message or TwiML',
  node: { displayName: 'Make Call', category: 'Call', type: 'action' },
  input: CallMakeInput,
  output: CallMakeOutput,
  func: async ({ twilio }, { From, To, Message, useTwiml, StatusCallback }) => {
    const Twiml = useTwiml ? Message : `<Response><Say>${escapeXml(Message)}</Say></Response>`

    return await twilio.request<Output>('/Calls.json', {
      body: { From, To, Twiml, StatusCallback },
    })
  },
})
